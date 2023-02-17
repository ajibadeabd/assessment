import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { userModel } from "../utils/databaseFactory/";

const jwtOptions: any = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = "your_jwt_secret";
export const secret_key = jwtOptions.secretOrKey;
const jwtStrategy = new JwtStrategy(
  jwtOptions,
  async (payload: any, done: any) => {
    try {
      const user = await userModel.findOne({
        id: payload.userId,
      });
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  }
);

passport.use(jwtStrategy);

// middleware to add user to req.user after successful authentication
export const authenticateUser = passport.authenticate("jwt", {
  session: false,
});
