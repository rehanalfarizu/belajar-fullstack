# SOFTWARE 02 — Install PostgreSQL & MongoDB

## PostgreSQL

### Mac

```bash
# Menggunakan Homebrew
brew install postgresql@15

# Start service
brew services start postgresql@15

# Connect
psql -U postgres
```

### Windows

1. Download dari https://www.postgresql.org/download/windows/
2. Jalankan installer
3. Catat password yang dibuat saat install
4. Buka **pgAdmin** dari Start Menu

### Linux (Ubuntu)

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

---

## PostgreSQL Basic Commands

```sql
-- Login
psql -U postgres

-- Buat database
CREATE DATABASE blog_db;

-- Connect ke database
\c blog_db

-- Buat tabel
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data
INSERT INTO users (username, email, password)
VALUES ('andi', 'andi@email.com', 'hashed_password');

-- Select data
SELECT * FROM users;

-- Update data
UPDATE users SET username = 'andi123' WHERE id = 1;

-- Delete data
DELETE FROM users WHERE id = 1;

-- Drop tabel
DROP TABLE users;
```

---

## MongoDB

### Mac

```bash
# Menggunakan Homebrew
brew install mongodb-community@7.0

# Start service
brew services start mongodb-community@7.0

# Connect
mongosh
```

### Windows

1. Download dari https://www.mongodb.com/try/download/community
2. Jalankan installer
3. Service otomatis berjalan di port 27017

### Linux (Ubuntu)

```bash
# Import key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Buat list file
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Install
sudo apt update
sudo apt install mongodb-org

# Start service
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## MongoDB Basic Commands

```javascript
// Connect
mongosh

// Show databases
show dbs

// Use/create database
use blog_db

// Show collections
show collections

// Insert document
db.users.insertOne({
  username: "andi",
  email: "andi@email.com",
  password: "hashed_password",
  createdAt: new Date()
})

// Insert many
db.posts.insertMany([
  { title: "Post1", content: "Content1", user_id: ObjectId() },
  { title: "Post 2", content: "Content 2", user_id: ObjectId() }
])

// Find all
db.users.find()

// Find with filter
db.users.find({ username: "andi" })

// Find one
db.users.findOne({ email: "andi@email.com" })

// Update
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { username: "andi123" } }
)

// Delete
db.users.deleteOne({ _id: ObjectId("...") })

// Count
db.users.countDocuments()

// Drop collection
db.users.drop()
```

---

## Ringkasan

```
PostgreSQL:
├── brew install postgresql     → Install
├── brew services start postgresql → Start
├── psql -U postgres           → Connect
├── CREATE DATABASE name → Buat DB
├── CREATE TABLE name (...)    → Buat tabel
└── SQL commands → CRUD operations

MongoDB:
├── brew install mongodb-community → Install
├── brew services start mongodb → Start
├── mongosh → Connect
├── use db_name                 → Buat/pilih DB
├── db.collection.insertOne()   → Insert
├── db.collection.find()       → Read
├── db.collection.updateOne()  → Update
└── db.collection.deleteOne()   → Delete
```