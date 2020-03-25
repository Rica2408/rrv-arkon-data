// ============================
// Puerto
// ============================

process.env.PORT = process.env.PORT || 3003;

// =============================
// Enlace
// =============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// =============================
// Base de datos
// =============================

let urlDB = 'mongodb+srv://richie2408:or2ZUWf5a0ZzLVCm@cluster0-du9tx.mongodb.net/task?retryWrites=true&w=majority'
process.env.URLDB = urlDB;

