import * as My from "jm-ez-mysql";
import { Tables } from "../../../config/tables";

export class UserUtils {
    public async addUser(details: any) {
        return await My.insert(Tables.USER, details);
    }

    public async getAdminById(id: number) {
        return await My.first(Tables.USER, ["*"], "id = ?", [id]);
    }

    public async getUserByEmail(email: string) {
        return await My.first(Tables.USER, ["*"], "email = ?", [email]);
    }
}