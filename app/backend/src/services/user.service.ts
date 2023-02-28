import { ModelStatic } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import User from '../database/models/User';
import IResponse from '../interfaces/IResponse';
import ILogin from '../interfaces/ILogin';
import { grResponse, grResponseErr } from '../utils/grResponse';
import gnToken from '../JWT/JWT';

class UserService {
  private model: ModelStatic<User> = User;

  async login(body: ILogin): Promise<IResponse> {
    const users = await this.model.findAll();
    const user = users.find((e) => e.email === body.email);

    const checkPass = bcrypt.compareSync(body.password, user?.password || '_');
    console.log(checkPass);

    if (!user || !checkPass) return grResponseErr(404, 'User not found');
    // if (checkPass)

    const { id, email, role, username } = user;
    const token = gnToken({ id, email, role, username });
    return grResponse(200, { token });
  }
}

export default UserService;
