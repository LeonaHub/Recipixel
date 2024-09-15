import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
  isActive: boolean;
  lastLogin?: Date | null;
}

// these are optional attributes when creating a User (e.g., id is usually auto-generated) 
interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'isActive' | 'lastLogin'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public firstName!: string | null;
  public lastName!: string | null;
  public isActive!: boolean;
  public lastLogin!: Date | null;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;