import mongoose,{Schema,Document,Model} from 'mongoose';

export interface User extends Document {
    name:string;
    email:string;
    phone:number;
    password:string;
    otp:string;
    otpExpiry:Date;
}

const UserSchema: Schema<User> = new Schema({
    name: { type: String, },
    email: { type: String,},
    phone: { type: Number, },
    password: { type: String, },
    otp: { type: String, },
    otpExpiry: { type: Date, },
},{
    timestamps:true
})
const UserModel : Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);
export default UserModel;