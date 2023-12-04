import { Module, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.entity';
import { Model } from 'mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'Botrista_Exam_20231208',
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule]
})

// export class AuthModule{}
export class AuthModule implements OnModuleInit{
  constructor(@InjectModel('user') private readonly userModel: Model<User>){}
  onModuleInit() {
    console.log(`follow these two role to login`);
    this.createIfNotExists('manager', 1);
    this.createIfNotExists('customer', 2);
  }

  private async createIfNotExists(account: string, roleType: number): Promise<void> {
    const user = {account: account, password: account, roleType: roleType};
    const isExist = await this.userModel.findOne({account: account}).exec();
    if(!isExist){
      this.userModel.create(user);
      console.log('create default account');
    }
    console.log(user);
  }
}

