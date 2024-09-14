import express from 'express';
import sequelize from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Test the database connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});