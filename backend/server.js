const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cardRoutes = require('./routes/cards');
const commentRoutes = require('./routes/comments');
const userRoutes = require('./routes/users');
const { verifyToken } = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/cards', verifyToken, cardRoutes);
app.use('/api/comments', verifyToken, commentRoutes);
app.use('/api/users', verifyToken, userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
