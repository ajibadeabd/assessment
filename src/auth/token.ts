import JWT from "jsonwebtoken";
import { secret_key } from "./passport";

class JwtService {
  private jwtService: typeof JWT;
  constructor(jwtService: typeof JWT) {
    this.jwtService = jwtService;
  }
  generate(data: { [key: string]: string }) {
    return this.jwtService.sign(data, secret_key);
  }
}

const jwtService = new JwtService(JWT);
export { jwtService };
