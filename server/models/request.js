import { Schema, model } from 'mongoose';

const RequestSchema = Schema(
	{
		fullName: {
			type: String,
			required: true,
		},
		phoneNumber: {
			type: String,
			required: true,
		},
		problem: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
);

export const Request = model('Request', RequestSchema);
