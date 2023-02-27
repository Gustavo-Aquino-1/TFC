import { Model, INTEGER, STRING } from 'sequelize';
// import sequelize = require('sequelize');
import db from './index';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'teams',
  },
);

export default Team;
