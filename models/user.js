const { DataTypes,Model } = require('sequelize');
const sequelize = require('./db');


class User extends Model {
  
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(24),
      unique: true,
      allowNull: true,
      defaultValue: null,
    },
    phone_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    api_token: {
      type: DataTypes.CHAR(60),
      unique: true,
      allowNull: true,
      defaultValue: null,
    },
    device_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remember_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      
      
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        
    }
  },
  {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'User', // We need to choose the model name
    tableName: "users"
  },
);
// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true

module.exports=User;