import mongoose,{Schema,Document,Model} from 'mongoose';

export interface User extends Document {
    name:string;
    email:string;
    phone:number;
    password:string;
}

const UserSchema: Schema<User> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number, required: true },
    password: { type: String, required: true },
},{
    timestamps:true
})
const UserModel : Model<User> = mongoose.models.User || mongoose.model<User>('User', UserSchema);
export default UserModel;