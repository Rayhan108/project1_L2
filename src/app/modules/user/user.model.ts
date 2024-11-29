import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
    id:{
        type:String,
        require:true
    },
    password:{
        tyoe:String,
        require:true
    },
    needsPasswordChange:{
        tyoe:Boolean,
        default:true
    },
    role:{
        type:String,
        enum:['student','facilty','admin']
    },
    status:{
        type:String,
        enum:['in-progress','blocked']
    },
}
timeStamp:true
)

export const UserModel =model<TUser>('User',userSchema)