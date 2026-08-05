# SOFTWARE 01 — Install Docker

## Apa itu Docker?

**Docker** adalah platform containerization — aplikasi dibungkus bersama dependencies-nya jadi satu unit yang bisa jalan di mana saja.

---

## Install Docker

### Mac

```bash
# Menggunakan Homebrew
brew install --cask docker

# Atau download dari https://docs.docker.com/desktop/install/mac-install/
# Download Docker.dmg dan install
```

### Windows

1. Download **Docker Desktop** dari https://www.docker.com/products/docker-desktop
2. Install dan jalankan Docker Desktop
3. Pastikan WSL 2 enabled (untuk Windows 10/11)

### Linux (Ubuntu)

```bash
# Install prerequisites
sudo apt update
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Add user to docker group (avoid sudo)
sudo usermod -aG docker $USER
# Logout and login again
```

---

## Verifikasi Install

```bash
docker --version
docker-compose --version

# Test with hello world
docker run hello-world
```

---

## Docker Basic Commands

```bash
# Pull image
docker pull nginx

# List images
docker images

# Run container
docker run -d -p 8080:80 --name my-nginx nginx

# List running containers
docker ps

# Stop container
docker stop my-nginx

# Start container
docker start my-nginx

# Remove container
docker rm my-nginx

# View logs
docker logs -f my-nginx

# Execute command in container
docker exec -it my-nginx bash

# Build image from Dockerfile
docker build -t my-app .

# Tag image
docker tag my-app:latest username/my-app:v1

# Push to registry
docker push username/my-app:v1
```

---

## Ringkasan

```
Docker Commands:
├── docker pull image     → Download image
├── docker run           → Jalankan container
├── docker ps → List running containers
├── docker stop/start → Stop/start container
├── docker exec          → Execute command in container
├── docker build         → Build image dari Dockerfile
├── docker-compose up → Jalankan multi-container app
└── docker system prune  → Bersihkan unused resources
```