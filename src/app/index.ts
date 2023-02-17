import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
import { sequelize } from "../models/index";

import routers from "../routes";

const swaggerDocument = YAML.load("swagger.yaml");

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
// import all routers
routers(app);



// Add middleware to serve the Swagger docs

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start the server
app.listen(port, async () => {
  await sequelize.sync();
  console.log(`Server started on  ${port}`);
});

// Export the Express API
export default app;
