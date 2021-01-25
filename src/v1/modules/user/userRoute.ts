import { Router } from "express";
import { Validator } from "../../../validate";
import { UserController } from "./userController";
import { UserMiddleware } from "./userMiddleware";
import { UserModel, AuthModel } from "./userModel";

const router: Router = Router();
const v: Validator = new Validator();
const userController: UserController = new UserController();
const userMiddleware: UserMiddleware = new UserMiddleware();

router.post("/add-user", v.validate(UserModel), userMiddleware.checkCredentials, userController.addUser);
router.post("/login", v.validate(AuthModel), userMiddleware.checkAuthCredentials, userController.login)

export const UserRoute: Router = router;