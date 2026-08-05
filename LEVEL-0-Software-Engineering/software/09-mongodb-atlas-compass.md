# 📦 Software 09 — MongoDB Atlas & Compass

## Apa itu MongoDB?

**MongoDB** = NoSQL document database. Data disimpan sebagai JSON-like documents (BSON).

```
RELATIONAL (PostgreSQL):          MONGODB (NoSQL):
┌─────────────────┐               ┌─────────────────┐
│ users           │               │ users           │
│ ├── id          │               │ [{              │
│ ├── name        │               │   "_id": 1,     │
│ ├── email        │               │   "name": "Andi",
│ └── password    │               │   "email": "...",│
│ orders          │               │   "orders": [...]│
│ ├── id          │               │ }]              │
│ ├── user_id     │               └─────────────────┘
│ ├── total       │
│ └── date        │                 FLEXIBLE SCHEMA
└─────────────────┘               Setiap document BISA beda struktur
        FIXED SCHEMA
```

---

## 1. Install MongoDB Community Edition (Local)

### Via Homebrew:

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0

# Jalankan service
brew services start mongodb-community@7.0

# Cek apakah jalan
brew services list
```

### Connect via CLI:

```bash
mongosh
# atau (versi lama):
mongo
```

---

## 2. MongoDB Atlas (Cloud)

MongoDB Atlas = hosted MongoDB di cloud (free tier tersedia).

### Langkah 1: Buat Akun

```
1. Buka https://www.mongodb.com/atlas
2. Klik "Try Free"
3. Daftar (Google, GitHub, atau email)
4. Verifikasi email
```

### Langkah 2: Buat Cluster

```
1. Klik "Build a Database"
2. Pilih Tier: "Free" (M0 Sandbox)
3. Region: Singapore (atau yang terdekat)
4. Cluster Name: "Cluster0" (atau bebas)
5. Klik "Create"
6. Tunggu deploy (3-5 menit)
```

### Langkah 3: Buat User Database

```
1. Security → Quickstart
2. Method: "Username and Password"
3. Username: admin
4. Password: (generate atau buat sendiri) → SIMPAN!
5. Local Access: 0.0.0.0/0 (allow semua IP) atau tambah IP kamu
6. Klik "Finish and Close"
```

---

## 3. Connect ke MongoDB Atlas

### Via MongoDB Compass (GUI):

```bash
brew install --cask mongodb-compass
```

**Connection String:**
```
mongodb+srv://admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

```
Di Compass:
1. Klik "New Connection"
2. Paste connection string
3. Ganti <PASSWORD> dengan password yang dibuat
4. Klik "Connect"
```

### Via Terminal (mongosh):

```bash
# Install mongosh
brew install mongosh

# Connect
mongosh "mongodb+srv://admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/test"
```

### Via Node.js (Mongoose):

```javascript
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://admin:<PASSWORD>@cluster0.xxxxx.mongodb.net/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected!'))
  .catch(err => console.error(err))
```

---

## 4. MongoDB Dasar (mongosh)

### Show databases & collections:

```javascript
show dbs
use myapp
show collections
```

### CRUD Operations:

```javascript
// CREATE — Insert
db.users.insertOne({
  name: "Andi Wijaya",
  email: "andi@email.com",
  age: 25,
  isActive: true
})

db.users.insertMany([
  { name: "Budi", email: "budi@email.com", age: 30 },
  { name: "Citra", email: "citra@email.com", age: 28 }
])

// READ — Find
db.users.find()                           // semua
db.users.find({ name: "Andi" })           // filter
db.users.findOne({ email: "andi@email.com" })  // satu
db.users.find({}, { name: 1, email: 1 })  // projection (hanya name & email)
db.users.find().limit(10)                 // limit 10
db.users.find().sort({ createdAt: -1 })    // sort desc

// UPDATE
db.users.updateOne(
  { _id: ObjectId("...") },
  { $set: { age: 26 } }
)

db.users.updateMany(
  { isActive: false },
  { $set: { status: "inactive" } }
)

// DELETE
db.users.deleteOne({ _id: ObjectId("...") })
db.users.deleteMany({ age: { $lt: 18 } })
```

---

## 5. Query Operators

```javascript
// Comparison
db.users.find({ age: { $gte: 25 } })         // >= 25
db.users.find({ age: { $lt: 30 } })         // < 30
db.users.find({ age: { $in: [25, 30, 35] } })  // IN [25, 30, 35]
db.users.find({ name: { $ne: "Andi" } })     // name != "Andi"

// Logical
db.users.find({
  $and: [
    { age: { $gte: 25 } },
    { isActive: true }
  ]
})

db.users.find({
  $or: [
    { age: { $gte: 30 } },
    { name: "Andi" }
  ]
})

// String
db.users.find({ name: { $regex: "^And", $options: "i" } })  // LIKE "%And%"
db.users.find({ email: /@gmail.com$/ })                    // email berakhiran @gmail.com

// Array
db.users.find({ hobbies: { $all: ["coding", "gaming"] } })  // punya BEIDE hobbies
db.users.find({ tags: "premium" })                           // ada "premium" dalam tags

// Existence
db.users.find({ phone: { $exists: true } })    // field phone ada
db.users.find({ phone: { $exists: false } })   // field phone tidak ada
```

---

## 6. Mongoose (Node.js ORM)

### Install:

```bash
npm install mongoose
```

### Define Schema & Model:

```javascript
const mongoose = require('mongoose')

// Schema definition
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  isActive: {
    type: Boolean,
    default: true
  },
  roles: [{
    type: String,
    enum: ['user', 'admin', 'moderator']
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}, { timestamps: true })

// Virtual (calculated field, tidak tersimpan di DB)
userSchema.virtual('fullName').get(function() {
  return `${this.name} (${this.age} tahun)`
})

// Method (custom method)
userSchema.methods.sayHello = function() {
  return `Hi, saya ${this.name}!`
}

// Static (query helper)
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email })
}

// Middleware (hook)
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

// Create model
const User = mongoose.model('User', userSchema)

module.exports = User
```

### CRUD dengan Mongoose:

```javascript
// Create
const user = await User.create({
  name: "Andi",
  email: "andi@email.com",
  password: "hashedpassword",
  age: 25
})

// Read
const users = await User.find({ age: { $gte: 25 } })
const user = await User.findById(id)
const activeUser = await User.findOne({ isActive: true })

// Update
await User.findByIdAndUpdate(id, { age: 26 }, { new: true })
await User.updateOne({ email }, { $set: { isActive: false } })

// Delete
await User.findByIdAndDelete(id)
await User.deleteMany({ isActive: false })

// Populate (join reference)
const posts = await Post.find().populate('author', 'name email')
```

### Pagination:

```javascript
const page = 1
const limit = 10
const skip = (page - 1) * limit

const users = await User.find()
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit)
  .select('name email')

const total = await User.countDocuments()
const totalPages = Math.ceil(total / limit)
```

---

## 7. Indexing (Optimasi Query)

```javascript
// Single field index
db.users.createIndex({ email: 1 }, { unique: true })
db.users.createIndex({ createdAt: -1 })

// Compound index
db.orders.createIndex({ userId: 1, createdAt: -1 })

// Text index (search)
db.articles.createIndex({ title: "text", body: "text" })
db.articles.find({ $text: { $search: "javascript tutorial" } })

// List indexes
db.users.getIndexes()

// Drop index
db.users.dropIndex("email_1")
```

---

## 8. MongoDB Atlas Features

### Data Explorer (Web UI):

```
Atlas → Clusters → Browse Collections
→ Bisa CRUD langsung dari browser
```

### Charts:

```
Atlas → Charts → Create Dashboard
→ Visualisasi data (bar, line, pie, dll)
```

### Search Index:

```javascript
// Buat Atlas Search index di web UI
//Lalu query:
db.articles.aggregate([{
  $search: {
    text: {
      query: "javascript",
      path: { 'title': 1, 'body': 1 }
    }
  }
}])
```

---

## Checklist

```
✅ MongoDB Atlas account + cluster dibuat
✅ MongoDB Compass installed
✅ Connect ke Atlas cluster
✅ Buat database + collection
✅ CRUD operations (insert, find, update, delete)
✅ Install mongoose di Node.js project
✅ Buat schema + model
✅ Pagination query
✅ Buat index untuk optimize
```

---

**Next:**
- Kembali ke Software 05: PostgreSQL
- Atau ke materi-praktikum/03-latihan-database.md (MongoDB section)