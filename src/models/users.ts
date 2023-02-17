import { Model } from "sequelize";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const UUID = {
  type: "UUID",
  defaultValue: uuidv4,
  allowNull: false,
};
// class User extends Model {
//   /**
//    * Helper method for defining associations.
//    * This method is not a part of Sequelize lifecycle.
//    * The `models/index` file will call this method automatically.
//    */
//   public id!: string;
//   public name!: string;
//   public email!: string;
//   public password!: string;
//   public date_created!: Date;
//   static associate(models: any) {
//     // define association here
//     console.log({ models });
//     User.hasMany(models.Tweet, {
//       foreignKey: "userId",
//       // as: "user",
//     });
//   }
// }
// export { User };

export default (sequelize: any, DataTypes: any) => {
  // class Users extends Model {
  //   /**
  //    * Helper method for defining associations.
  //    * This method is not a part of Sequelize lifecycle.
  //    * The `models/index` file will call this method automatically.
  //    */
  //   public userId!: string;
  //   public name!: string;
  //   public email!: string;
  //   public password!: string;
  //   public date_created!: Date;
  //   public create = () => {};
  // static associate(models: any) {
  //   // define association here
  //   console.log({ models });
  //   // Users.hasMany(models.Tweet, {
  //   //   foreignKey: "userId",
  //   //   as: "user",
  //   // });
  // }
  // }
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public date_created!: Date;
    static associate(models: any) {
      // define association here
      console.log({ models });
      User.hasMany(models.Tweet, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  User.init(
    {
      id: { ...UUID, primaryKey: true },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      // tableName: "Users",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      hooks: {
        beforeCreate: async (user, options) => {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          user.password = hashedPassword;
        },
        beforeUpdate: async (user, options) => {
          if (user.changed("password")) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
          }
        },
      },
    }
  );

  return User;
};
