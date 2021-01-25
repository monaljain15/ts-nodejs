import { IsEmail, IsNotEmpty, IsEnum, Validate } from "class-validator";
import { Model } from "../../../model";
import { IsEmailAlreadyExistConstraint } from './userValidator';

export class UserModel extends Model {
    @IsNotEmpty()
    public firstName: string;

    @IsNotEmpty()
    public lastName: string;

    @IsNotEmpty()
    @IsEmail()
    @Validate(IsEmailAlreadyExistConstraint, {message: "User with email already exists"})
    public email: string;

    @IsNotEmpty()
    public password: string;

    @IsNotEmpty()
    public dob: string;

    @IsNotEmpty()
    @IsEnum(['Admin', 'Manager', 'User'])
    public role: string;

    @IsNotEmpty()
    public city: string;

    @IsNotEmpty()
    public state: string;

    constructor(body: any) {
        super();
        const {
            firstName,
            lastName,
            email,
            password,
            dob,
            role,
            city,
            state 
        } = body;

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dob = dob;
        this.role = role;
        this.city = city;
        this.state = state;
    }
}

export class AuthModel extends Model {

    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsNotEmpty()
    public password: string;

    constructor(body: any) {
        super();
        const {
            email,
            password,
        } = body;

        this.email = email;
        this.password = password;
    }
}