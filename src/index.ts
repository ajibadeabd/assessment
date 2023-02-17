import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { sequelize } from "./models/index";

// const db = re
import routers from "./routes";

const swaggerDocument = YAML.load("./swagger.yaml");

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 400 && err instanceof SyntaxError && "body" in err) {
    return res.status(400).send({ error: "Invalid Request body" });
  }
  next();
});

// Add middleware to serve the Swagger docs

app.get("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// import all routers
routers(app);

// Start the server
app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server started on  ${port}`);
});

// Export the Express API
export default app;
