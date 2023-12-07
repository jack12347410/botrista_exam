import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UserDto{
    @ApiProperty()
    @IsNotEmpty()
    account: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}