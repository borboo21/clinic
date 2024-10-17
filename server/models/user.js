import { Schema, model } from 'mongoose';

const UserSchema = Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

export const User = model('user', UserSchema);
