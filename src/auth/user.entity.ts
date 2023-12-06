import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "@nestjs/passport";
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document{
    _id: Types.ObjectId;
    
    @Prop({required: true, unique: true})
    account: string;

    @Prop({required: true})
    password: string;

    @Prop({required: true})
    roleType: number;
}

export const UserSchema = SchemaFactory.createForClass(User);