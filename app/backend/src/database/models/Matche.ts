import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Matche extends Model {
  declare id: number;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matche.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    homeTeamId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    awayTeamId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'teams',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    homeTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    awayTeamGoals: {
      type: INTEGER,
      allowNull: false,
    },
    inProgress: {
      type: BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize: db,
    timestamps: false,
    underscored: true,
    tableName: 'matches',
  },
);

// lembre-se da regra belogns to alguma coisa, sempre vai se referir a tabela principal no caso a Team
// a secundaria sempre pertence (belongs) a principal
// e a principal sempre tem (has) a secundaria

Matche.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Matche, { foreignKey: 'homeTeamId', as: 'matchesHome' });

Matche.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });
Team.hasMany(Matche, { foreignKey: 'awayTeamId', as: 'matchesAway' });

export default Matche;
