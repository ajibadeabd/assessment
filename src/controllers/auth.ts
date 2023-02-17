import { Request, Response } from "express";
import { userModel } from "../utils/databaseFactory/user.database.factory";
import * as bcrypt from "bcrypt";
import { jwtService } from "../utils/token";
class AuthController {
  private userModel;

  constructor(Model: typeof userModel) {
    // Model: typeof userModel
    this.userModel = Model;
  }

  // Route handler for creating a new user.
  createUser = async (req: Request, res: Response) => {
    const {  email, password } = req.body;
    let name = email.split("@")[0]
    try {
      const user = await this.userModel.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = await this.userModel.create({ name, email, password });
      const savedUser = await newUser.save();
      return res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
  // Route handler for creating a new user.
  loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const user = await this.userModel.findOne(
        { email },
        {
          include: ["password"],
        }
      );
      if (!user) {
        return res.status(201).json({ message: "User not found" });
      }
      let validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).json({ message: "incorrect password", user });

      return res.status(200).json({
        token: jwtService.generate({ userId: user.id }),
        user: { email,  userId:user.id },
      });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export const authController = new AuthController(userModel);
// userModel // schema was pass here to follow dependency inversion principle
