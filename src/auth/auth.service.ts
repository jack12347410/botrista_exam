import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.entity';
import { UserDto } from './user.dto';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @InjectModel('user') private readonly userModel: Model<User>
    ){}


    async login(dto: UserDto): Promise<{accessToken: string}> {
        const user =  await this.userModel.findOne({account: dto.account, password: dto.password}, 
            {account: 1, roleType: 1}).exec();

        if(user === null){
            throw new NotFoundException("account or password is error!");
        }

        return {
            accessToken: this.getToken(user),
        };
    }
    

    private getToken(user: User): string{
        const payload = {account: user.account, roleType: user.roleType};
        return this.jwtService.sign(payload);
    }
}
