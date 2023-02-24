const mongoose = require('mongoose');
// connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/book-engines', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;
