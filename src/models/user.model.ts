import { Document, Schema, model } from 'mongoose';

export interface UserDocument extends Document {
	email: string;
	password: string;
	name?: string;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		name: { type: String }
	},
	{ timestamps: true }
);

const User = model<UserDocument>('User', UserSchema);

export default User;
