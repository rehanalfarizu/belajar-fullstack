# 📘 MATERI TEORI 04 — Database NoSQL (MongoDB)

## 1. Apa itu MongoDB?

MongoDB = database **document-oriented** — data disimpan sebagai **JSON-like documents** (BSON), bukan tabel.

```
SQL:                                   MongoDB:
┌──────────┐                          ┌────────────────────┐
│  users   │                          │  users (collection) │
├──────────┤                          ├────────────────────┤
│ id (PK)  │──┐                       │ {                  │
│ name     │  │  ┌─────────┐         │   _id: ObjectId,   │
│ email    │  └──►│ posts   │         │   name: "Andi",    │
└──────────┘     ├─────────┤         │   email: "...",    │
                 │ id (FK) │         │   posts: [          │
                 │ title   │         │     { title: "...",│
                 │ body    │         │       body: "..."  │
                 └─────────┘         │   ]                │
                                     │ }                  │
                                     └────────────────────┘
```

---

## 2. SQL vs MongoDB Terminologi

| SQL | MongoDB |
|-----|---------|
| Database | Database |
| Table | Collection |
| Row / Record | Document |
| Column | Field |
| Primary Key | `_id` (auto ObjectId) |
| JOIN | `$lookup` atau embedding |
| INSERT | `insertOne()`, `insertMany()` |
| SELECT | `find()` |
| WHERE | Query object `{ field: value }` |
| UPDATE | `updateOne()`, `updateMany()` |
| DELETE | `deleteOne()`, `deleteMany()` |

---

## 3. BSON Data Types

```javascript
// String
{ name: "Andi Wijaya" }

// Number
{ age: 25 }
{ price: 19.99 }

// Boolean
{ isActive: true }

// Date — selalu simpan sebagai Date, bukan string!
{ createdAt: new Date("2026-05-31") }

// ObjectId — ID unik otomatis
{ _id: ObjectId("684a3b2c1d2e3f4a5b6c7d8e") }

// Array
{ hobbies: ["coding", "gaming", "reading"] }

// Object (embedded document)
{ address: { city: "Jakarta", zip: "12345" } }

// Null
{ middleName: null }

// Regular Expression
{ email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }

// Buffer (binary)
{ avatar: Buffer.from("data") }
```

---

## 4. CRUD di MongoDB Shell

### Insert

```javascript
// Insert satu document
db.users.insertOne({
  name: "Andi Wijaya",
  email: "andi@email.com",
  age: 25,
  isActive: true
});

// Insert banyak document
db.users.insertMany([
  { name: "Budi Santoso", email: "budi@email.com", age: 30 },
  { name: "Citra Dewi", email: "citra@email.com", age: 28 },
  { name: "Dewi Lestari", email: "dewi@email.com", age: 22 }
]);
```

### Find (SELECT)

```javascript
// Semua document
db.users.find()

// Semua, format JSON rapi
db.users.find().pretty()

// Proyeksi — pilih field yang mau ditampilkan
db.users.find({}, { name: 1, email: 1 })
// Output: { "_id": ..., "name": "Andi", "email": "andi@email.com" }

// Exclude field tertentu
db.users.find({}, { age: 0 })

//WHERE — Query Operators
db.users.find({ age: 25 })                       // age = 25
db.users.find({ age: { $gt: 18 } })               // age > 18
db.users.find({ age: { $gte: 18 } })              // age >= 18
db.users.find({ age: { $lt: 30 } })               // age < 30
db.users.find({ age: { $lte: 30 } })              // age <= 30
db.users.find({ age: { $gte: 18, $lte: 30 } })   // 18 <= age <= 30

// AND implisit
db.users.find({ age: 25, isActive: true })

// OR
db.users.find({
  $or: [
    { age: { $gte: 25 } },
    { name: "Andi" }
  ]
})

// NOT EQUAL
db.users.find({ role: { $ne: "admin" } })

// IN / NIN
db.users.find({ role: { $in: ["user", "editor"] } })
db.users.find({ role: { $nin: ["banned"] } })

// EXISTS
db.users.find({ phone: { $exists: true } })

// NULL / NOT NULL
db.users.find({ phone: null })          // semua yang null atau field tidak ada
db.users.find({ phone: { $exists: true, $eq: null } }) // hanya null
```

### Operator Penting

```javascript
// String operators
db.users.find({ name: { $regex: "and", $options: "i" } }) // LIKE '%and%' (case-insensitive)
db.users.find({ email: { $in: ["a@email.com", "b@email.com"] } })

// Array operators
db.users.find({ hobbies: "coding" })         // array mengandung "coding"
db.users.find({ hobbies: { $all: ["coding", "gaming"] } }) // mengandung semua
db.users.find({ hobbies: { $size: 3 } })      // array panjang 3

// Element operators
db.users.find({ age: { $exists: true, $type: "number" } })

// Evaluation
db.users.find({ $expr: { $gt: ["$age", "$minAge"] } })
```

### Sort, Limit, Skip

```javascript
db.users.find().sort({ createdAt: -1 })  // DESC (terbaru duluan)
db.users.find().sort({ name: 1 })        // ASC
db.users.find().limit(10)                // hanya 10
db.users.find().skip(20).limit(10)        // pagination (halaman 3)
```

### Update

```javascript
// Update satu document (pertama yang ditemukan)
db.users.updateOne(
  { _id: ObjectId("...") },
  {
    $set: { age: 26 },
    $currentDate: { updatedAt: true }
  }
)

// Update banyak document
db.users.updateMany(
  { isActive: false },
  { $set: { status: "inactive" } }
)

// Increment (tambah/kurang angka)
db.users.updateOne(
  { _id: ObjectId("...") },
  { $inc: { age: 1 } }   // +1, gunakan $inc agar atomic
)

// Array operations
db.users.updateOne(
  { _id: ObjectId("...") },
  {
    $push: { hobbies: "memancing" }           // tambah item array
    // $pull: { hobbies: "gaming" }            // hapus item array
  }
)

// Rename field
db.users.updateOne({}, { $rename: { "old_field": "new_field" } })

// Unset field
db.users.updateOne({}, { $unset: { temp_field: "" } })
```

### Delete

```javascript
// Hapus satu
db.users.deleteOne({ _id: ObjectId("...") })

// Hapus banyak
db.users.deleteMany({ isActive: false })

// Hapus semua
db.users.deleteMany({})
```

---

## 5. Aggregation Pipeline

Aggregation = pipeline untuk transformasi data kompleks (seperti GROUP BY + JOIN + computed fields).

```javascript
// Pipeline: [] → $match → $group → $sort
db.orders.aggregate([
  // Step 1: Filter
  { $match: { status: "completed" } },

  // Step 2: Unwind array
  { $unwind: "$items" },

  // Step 3: Group
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: "$items.price" },
      orderCount: { $sum: 1 }
    }
  },

  // Step 4: Sort
  { $sort: { totalSpent: -1 } },

  // Step 5: Limit
  { $limit: 10 },

  // Step 6: Project (format output)
  {
    $project: {
      _id: 0,
      userId: "$_id",
      totalSpent: 1,
      orderCount: 1,
      tier: {
        $switch: {
          branches: [
            { case: { $gte: ["$totalSpent", 1000000] }, then: "Gold" },
            { case: { $gte: ["$totalSpent", 500000] }, then: "Silver" }
          ],
          default: "Bronze"
        }
      }
    }
  }
])
```

### Common Aggregation Stages

```javascript
// $match — filter
{ $match: { age: { $gte: 18 } } }

// $group — group by
{ $group: { _id: "$role", count: { $sum: 1 } } }

// $sort — urutkan
{ $sort: { count: -1 } }

// $limit — batasi hasil
{ $limit: 5 }

// $skip — skip (pagination)
{ $skip: 10 }

// $project — pilih field / buat field baru
{ $project: { name: 1, email: 1 } }

// $unwind — pecah array jadi banyak document
{ $unwind: "$tags" }

// $lookup — JOIN dengan collection lain
{
  $lookup: {
    from: "users",          // collection target
    localField: "userId",   // field di collection ini
    foreignField: "_id",    // field di collection target
    as: "userDetails"       // nama field output (array)
  }
}

// $count — hitung document
{ $count: "totalUsers" }

// $addFields — tambah field computed
{ $addFields: { fullName: { $concat: ["$firstName", " ", "$lastName"] } } }
```

---

## 6. MongoDB di Node.js (Mongoose)

Mongoose = ODM (Object Document Mapper) — bikin schema + model untuk MongoDB.

### Connect

```javascript
const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/myapp");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB error:", error.message);
  }
}

connectDB();

// Graceful shutdown
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
```

### Schema Definition

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Nama wajib diisi"],
    trim: true,
    maxlength: [100, "Max 100 karakter"]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Email tidak valid"]
  },
  age: {
    type: Number,
    min: [0, "Umur tidak boleh negatif"],
    max: 150
  },
  role: {
    type: String,
    enum: ["user", "editor", "admin"],
    default: "user"
  },
  hobbies: [String],         // array of strings
  address: {                // embedded document
    city: String,
    zip: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,          // auto createdAt & updatedAt
  collection: "users"
});

// Virtual — field computed (tidak disimpan di DB)
userSchema.virtual("fullInfo").get(function () {
  return `${this.name} (${this.email})`;
});

// Method instance
userSchema.methods.sayHello = function () {
  return `Halo, saya ${this.name}`;
};

// Static method
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

// Middleware (hook)
userSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Index
userSchema.index({ email: 1 });
userSchema.index({ name: "text", email: "text" });

const User = mongoose.model("User", userSchema);
module.exports = User;
```

### CRUD dengan Mongoose

```javascript
// CREATE
async function createUser(name, email) {
  const user = new User({ name, email });
  return await user.save();          // insert ke DB
  // atau: return await User.create({ name, email });
}

// READ
async function getUsers(page = 1, limit = 10) {
  return await User.find()                          // semua
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select("name email role");                     // proyeksi
}

async function getUserById(id) {
  return await User.findById(id);                   // by _id
}

async function getUserByEmail(email) {
  return await User.findOne({ email });
}

// UPDATE
async function updateUser(id, data) {
  // findByIdAndUpdate: langsung update, tanpa load ke memory
  return await User.findByIdAndUpdate(
    id,
    { $set: data },
    { new: true, runValidators: true }  // return doc baru + validasi
  );
}

async function updateUserFull(id, data) {
  const user = await User.findById(id);
  Object.assign(user, data);   // merge manual
  return await user.save();    // trigger middleware & validasi
}

// DELETE
async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}

// COUNT
async function countUsers(role) {
  return await User.countDocuments({ role });
}

// SEARCH (text search)
async function searchUsers(query) {
  return await User.find({
    $text: { $search: query }
  }, {
    score: { $meta: "textScore" }
  }).sort({ score: { $meta: "textScore" } });
}
```

### Population (Seperti JOIN)

```javascript
// Schema dengan reference
const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [{
    text: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now }
  }]
});

// find + populate
const posts = await Post.find()
  .populate("author", "name email")           // satu level
  .populate({
    path: "comments.author",
    select: "name avatar"
  })
  .sort({ createdAt: -1 });
```

### Middleware / Hooks

```javascript
// Pre — sebelum operasi
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  // hash password di sini
  next();
});

postSchema.pre("findOneAndUpdate", async function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

// Post — setelah operasi
userSchema.post("save", function (doc, next) {
  console.log(`User ${doc.name} disimpan`);
  next();
});
```

---

## Ringkasan

```
MongoDB
├── Document      → JSON/BSON, _id auto, schema flexible
├── CRUD          → insertOne/Many, find, updateOne/Many, deleteOne/Many
├── Query         → $gt, $in, $or, $regex, $exists, $type
├── Aggregation   → $match, $group, $sort, $lookup, $unwind, $project
├── Index         → single field, compound, text, 2dsphere
└── Mongoose      → Schema, Model, Virtual, Population, Middleware
```

---

**Lanjut ke praktikum →** Buka folder `materi-praktikum/03-latihan-database/`