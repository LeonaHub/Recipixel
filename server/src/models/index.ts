import { Sequelize } from 'sequelize';
import sequelize from '../config/database';
import User from './User';


sequelize.sync().then(() => {
  console.log('Database synchronized');
}).catch((error) => {
  console.error('Error synchronizing database:', error);
});

export { sequelize, User };