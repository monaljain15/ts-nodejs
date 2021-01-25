import { Request, Response } from "express";
import _ = require("lodash");
import bcryptjs = require("bcryptjs");
import { Jwt } from "../../../helpers/jwt";
import { UserUtils } from "./userUtils";

export class UserMiddleware {

    private userUtils: UserUtils = new UserUtils();
    public checkCredentials = async (req: Request, res: Response, next: () => void) => {
        if (req.headers.Authorization && !_.isEmpty(req.headers.Authorization)) {
            try {
                const token = Jwt.decodeAuhToken(req.headers.authorization.toString());
                if (token) {
                    const admin = await this.userUtils.getAdminById(token.userId);
                    if (admin && admin.role === 'Admin') {
                        next();
                    } else {
                        res.status(401).json({error: req.t("ERR_UNAUTH")});
                        return;
                    }
                }
            } catch (error) {
                res.status(401).json({error: req.t("ERR_UNAUTH")});
                return;
            }
        } else {
            res.status(401).json({error: req.t("ERR_UNAUTH")});
            return;
        }
    }

    public checkAuthCredentials = async (req: Request, res: Response, next: () => void) => {
        try {
            const admin = await this.userUtils.getUserByEmail(req.body.email);
            if (admin && admin.role === 'Admin' && await bcryptjs.compare(req.body.password, admin.password)) {
                req.body.id = admin.id;
                next();
            } else {
                res.status(401).json({error: req.t("ERR_UNAUTH")});
                return;
            }
            
        } catch (error) {
            res.status(401).json({error: req.t("ERR_UNAUTH")});
            return;
        }
        
    }

}