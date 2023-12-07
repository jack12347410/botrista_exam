import { IsNotEmpty } from "class-validator";

export class UserDto{
    @IsNotEmpty()
    account: string;

    @IsNotEmpty()
    password: string;
}