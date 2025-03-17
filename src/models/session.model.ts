import { Document, Schema, model, Types } from 'mongoose';

export interface SessionDocument extends Document {
	user: Types.ObjectId; // Reference to the User document
	token: string;        // The JWT token
	createdAt: Date;
	updatedAt: Date;
}

const SessionSchema = new Schema<SessionDocument>(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		token: { type: String, required: true }
	},
	{ timestamps: true }
);

const Session = model<SessionDocument>('Session', SessionSchema);

export default Session;
