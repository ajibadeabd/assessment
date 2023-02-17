import { FindAttributeOptions, Model } from "sequelize";
import { userModel as User } from "../../models";
export class Users extends Model {
  public id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
}
class UserModel {
  private userModel;

  constructor(userModel: typeof User) {
    this.userModel = userModel;
  }

  async create(data: {}): Promise<Users> {
    return this.userModel.create(data);
  }

  async findById(id: number): Promise<Users> {
    return this.userModel.findByPk(id);
  }

  async findOne(
    filterQuery: { [x: string]: string },
    attributes?: FindAttributeOptions
  ): Promise<Users> {
    return this.userModel.findOne({
      where: filterQuery,
      attributes,
    });
  }

  async update(id: number, data: { [key: string]: string }): Promise<boolean> {
    const result = await this.userModel.update(data, {
      where: { userId: id },
    });
    return result[0] === 1;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.userModel.destroy({ where: { userId: id } });
    return result === 1;
  }
}

export const userModel = new UserModel(User);
