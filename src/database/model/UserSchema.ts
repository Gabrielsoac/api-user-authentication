import { model, Schema } from "mongoose";
import { TUserProps } from "./TUserProps";

const UserSchema = new Schema<TUserProps>(
    {
        username: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, required: false}
    }
);

UserSchema.index({email: 1}, {unique: true});
UserSchema.index({username: 1}, {unique: true});

export const UserModel = model<TUserProps>('User', UserSchema);