import { Express, Router } from "express";
import auth from "./auth";
import user from "./tweet";
import comment from "./comment";
const routers = (app: Express) => {
  return app
    .use("/api/auth", auth(Router()))
    .use("/api/tweet", user(Router()))
    .use("/api/comment", comment(Router()));
};
export default routers;
