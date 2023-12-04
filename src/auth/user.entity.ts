import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User extends Document{
    @Prop({required: true, unique: true})
    account: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    roleType: number;
}

export const UserSchema = SchemaFactory.createForClass(User);