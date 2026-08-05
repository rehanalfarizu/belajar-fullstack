/**
 * TODO: React Presence Tracker Component
 *
 * Implementasikan komponen React untuk real-time presence tracking.
 *
 * Features:
 * 1. Show online users (avatars, names, status)
 * 2. Cursor position broadcasting
 * 3. Selection highlighting
 * 4. Typing indicators
 * 5. Idle/away detection
 *
 * Integrates dengan Socket.io server dari code/02-socketio-server.js
 */

import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  createContext,
  useContext,
} from 'react';
import { io } from 'socket.io-client';

// ============================================================
// CONTEXT
// ============================================================

export const PresenceContext = createContext(null);

/**
 * TODO: PresenceProvider
 *
 * Wraps app dan manages Socket.io connection untuk presence.
 * Menyediakan presence state ke seluruh app via Context.
 */
export function PresenceProvider({ children, documentId, user, socketUrl }) {
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]); // { socketId, user, cursor, selection, status }
  const [connected, setConnected] = useState(false);

  // TODO: Connect to Socket.io server
  useEffect(() => {
    const newSocket = io(socketUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
    });

    newSocket.on('connect', () => {
      console.log('[Presence] Connected:', newSocket.id);
      setConnected(true);

      // TODO: Join document room
      // newSocket.emit('join_room', { roomId: documentId, user });
    });

    newSocket.on('disconnect', () => {
      console.log('[Presence] Disconnected');
      setConnected(false);
    });

    // ============================================================
    // PRESENCE EVENTS
    // ============================================================

    // User joined
    newSocket.on('user_joined', ({ socketId, user: newUser }) => {
      // TODO: Add user ke state
      // setUsers(prev => [...prev, { socketId, user: newUser, status: 'active' }]);
    });

    // User left
    newSocket.on('user_left', ({ socketId }) => {
      // TODO: Remove user dari state
      // setUsers(prev => prev.filter(u => u.socketId !== socketId));
    });

    // Presence sync (initial state)
    newSocket.on('presence:sync', ({ users: initialUsers }) => {
      // TODO: Set initial users state
      // setUsers(initialUsers);
    });

    // Cursor update
    newSocket.on('presence:cursor_update', ({ socketId, cursor }) => {
      // TODO: Update cursor position untuk user
      // setUsers(prev => prev.map(u =>
      //   u.socketId === socketId ? { ...u, cursor } : u
      // ));
    });

    // Selection update
    newSocket.on('presence:selection_update', ({ socketId, selection, color }) => {
      // TODO: Update selection untuk user
    });

    // Status change (active → idle → away)
    newSocket.on('presence:status_change', ({ socketId, status }) => {
      // TODO: Update status untuk user
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [documentId, user, socketUrl]);

  // ============================================================
  // PRESENCE ACTIONS
  // ============================================================

  /**
   * TODO: Update local cursor position dan broadcast
   */
  const updateCursor = useCallback((position) => {
    if (!socket) return;
    // TODO: Emit cursor:move event
    // socket.emit('cursor:move', { documentId, position });
  }, [socket, documentId]);

  /**
   * TODO: Update selection dan broadcast
   */
  const updateSelection = useCallback((selection) => {
    if (!socket) return;
    // TODO: Emit selection:change event
  }, [socket, documentId]);

  /**
   * TODO: Broadcast typing indicator
   */
  const setTyping = useCallback((isTyping) => {
    if (!socket) return;
    // TODO: Emit typing atau stop_typing event
  }, [socket, documentId]);

  const value = {
    socket,
    users,
    connected,
    updateCursor,
    updateSelection,
    setTyping,
  };

  return (
    <PresenceContext.Provider value={value}>
      {children}
    </PresenceContext.Provider>
  );
}

// ============================================================
// HOOK: usePresence
// ============================================================

export function usePresence() {
  const context = useContext(PresenceContext);
  if (!context) {
    throw new Error('usePresence must be used within PresenceProvider');
  }
  return context;
}

// ============================================================
// COMPONENT: PresenceIndicator
// ============================================================

/**
 * TODO: PresenceIndicator
 *
 * Shows avatars/indicators untuk online users.
 * Supports:
 * - Avatar stack (max 5 visible, +N more)
 * - Status dot (active/idle/away)
 * - Tooltip dengan names
 */
export function PresenceIndicator({ maxVisible = 5 }) {
  const { users, connected } = usePresence();

  // Filter out self
  const otherUsers = users.filter((u) => u.socketId !== 'self');

  // Limit visible
  const visibleUsers = otherUsers.slice(0, maxVisible);
  const extraCount = otherUsers.length - maxVisible;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
      role="status"
      aria-label={`${otherUsers.length} users online`}
    >
      {/* Connection indicator */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: connected ? '#22c55e' : '#ef4444',
        }}
        title={connected ? 'Connected' : 'Disconnected'}
      />

      {/* User avatars */}
      {visibleUsers.map((presence) => (
        <UserAvatar key={presence.socketId} presence={presence} />
      ))}

      {/* Extra count */}
      {extraCount > 0 && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            backgroundColor: '#e5e7eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
          title={`${extraCount} more users`}
        >
          +{extraCount}
        </div>
      )}
    </div>
  );
}

// ============================================================
// COMPONENT: UserAvatar
// ============================================================

/**
 * TODO: UserAvatar dengan status dot
 */
export function UserAvatar({ presence, size = 32 }) {
  const { user, status = 'active', color } = presence;

  const statusColors = {
    active: '#22c55e',
    idle: '#eab308',
    away: '#94a3b8',
  };

  return (
    <div
      title={user?.name || 'Anonymous'}
      style={{
        position: 'relative',
        width: size,
        height: size,
      }}
    >
      {/* Avatar */}
      <img
        src={user?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '?')}&background=${color || 'random'}`}
        alt={user?.name}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          border: `2px solid ${color || '#6366f1'}`,
        }}
      />

      {/* Status dot */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: size * 0.35,
          height: size * 0.35,
          borderRadius: '50%',
          backgroundColor: statusColors[status] || statusColors.active,
          border: '2px solid white',
        }}
      />
    </div>
  );
}

// ============================================================
// COMPONENT: RemoteCursor
// ============================================================

/**
 * TODO: RemoteCursor
 *
 * Shows remote user's cursor position di editor.
 * Animates smoothly between position changes.
 */
export function RemoteCursor({ presence }) {
  const { cursor, user, color } = presence;

  if (!cursor || !cursor.x || !cursor.y) return null;

  // TODO: Implementasikan cursor rendering
  // Hint: Absolute position dengan transform
  // Hint: Gunakan CSS transition untuk smooth movement
  // Hint: Include caret/cursor icon + name label

  return (
    <div
      style={{
        position: 'absolute',
        left: cursor.x,
        top: cursor.y,
        pointerEvents: 'none',
        zIndex: 1000,
        transition: 'left 0.1s, top 0.1s',
      }}
    >
      {/* TODO: Cursor caret/icon */}
      {/* TODO: Name label */}
    </div>
  );
}

// ============================================================
// COMPONENT: RemoteSelection
// ============================================================

/**
 * TODO: RemoteSelection
 *
 * Highlights text yang sedang dipilih oleh remote user.
 */
export function RemoteSelection({ presence }) {
  const { selection, user, color } = presence;

  if (!selection) return null;

  // TODO: Implementasikan selection overlay
  // Hint: Gunakan decoration/range API atau custom overlay
  // Hint: Apply background color dengan alpha

  return null; // TODO: Return decoration elements
}

// ============================================================
// COMPONENT: TypingIndicator
// ============================================================

/**
 * TODO: TypingIndicator
 *
 * Shows animated dots ketika user sedang mengetik.
 */
export function TypingIndicator({ roomId }) {
  const { socket } = usePresence();
  const [typingUsers, setTypingUsers] = useState([]);

  // TODO: Listen untuk typing/stop_typing events
  // TODO: Set timeout untuk auto-clear typing status

  if (typingUsers.length === 0) return null;

  const names = typingUsers.map((u) => u.username).join(', ');
  const text = typingUsers.length === 1
    ? `${names} is typing...`
    : `${names} are typing...`;

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        fontSize: '12px',
        color: '#6b7280',
        padding: '4px 8px',
      }}
    >
      {text}
      {/* Animated dots */}
      <span style={{ display: 'inline-block' }}>
        <span style={{ animation: 'bounce 1s infinite' }}>.</span>
        <span style={{ animation: 'bounce 1s infinite 0.2s' }}>.</span>
        <span style={{ animation: 'bounce 1s infinite 0.4s' }}>.</span>
      </span>
    </div>
  );
}

// ============================================================
// COMPONENT: PresenceLayer
// ============================================================

/**
 * TODO: PresenceLayer
 *
 * Combines semua presence components.
 * Cara pakai: <PresenceLayer editorRef={editorRef} />
 */
export function PresenceLayer({ editorRef }) {
  const { users } = usePresence();

  // Filter out self dan users tanpa cursor
  const usersWithCursor = users.filter(
    (u) => u.socketId !== 'self' && u.cursor
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Remote cursors */}
      {usersWithCursor.map((presence) => (
        <RemoteCursor key={presence.socketId} presence={presence} />
      ))}

      {/* Remote selections */}
      {usersWithCursor.map((presence) =>
        presence.selection ? (
          <RemoteSelection key={`sel-${presence.socketId}`} presence={presence} />
        ) : null
      )}
    </div>
  );
}

// ============================================================
// HOOK: useCursorTracking
// ============================================================

/**
 * TODO: useCursorTracking
 *
 * Hook untuk track cursor position dan broadcast.
 * Connects ke editor (textarea/div dengan contentEditable).
 */
export function useCursorTracking(editorRef) {
  const { socket } = usePresence();
  const throttledEmit = useRef(null);

  useEffect(() => {
    if (!editorRef.current || !socket) return;

    const editor = editorRef.current;

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const editorRect = editor.getBoundingClientRect();

      const cursorPosition = {
        x: rect.left - editorRect.left,
        y: rect.top - editorRect.top,
        // line: ..., column: ... (jika menggunakan editor dengan line tracking)
      };

      // TODO: Emit cursor position
      // Throttle untuk avoid flooding
    };

    // TODO: Setup selectionchange event listener
    // Use throttling (50ms)

    return () => {
      // TODO: Cleanup
    };
  }, [editorRef, socket]);
}

export default PresenceProvider;
