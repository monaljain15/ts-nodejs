import { Request, Response } from "express";
import bcryptjs = require("bcryptjs");
import _ = require("lodash");
import { UserUtils } from "./userUtils";
import { Jwt } from "../../../helpers/jwt";

export class UserController {
    private userUtils: UserUtils = new UserUtils();
    public addUser = async (req: Request, res: Response) => {
        if (req.body.password && !_.isEmpty(req.body.password)) {
            req.body.password = bcryptjs.hashSync(req.body.password.tostring(), 12);
        }

        const saveDetails = {
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            dob: req.body.dob,
            role: req.body.role,
            city: req.body.city,
            state: req.body.state,
        }
        await this.userUtils.addUser(saveDetails);
        res.status(200).json({message: "User added successfully"});
    }

    public login = async (req: Request, res: Response) => {
        const token = Jwt.getAuthToken({userId: req.body.id});
        res.status(200).json({token, email: req.body.email});
    }
}