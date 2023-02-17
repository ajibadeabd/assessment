import JWT from "jsonwebtoken";
import { secret_key } from "./passport";

class JwtService {
  generate(data: { [key: string]: string }) {
    return JWT.sign(data, secret_key);
  }
  decode(token: string) {
    JWT.decode(token);
  }
}

const jwtService = new JwtService();
export { jwtService };
