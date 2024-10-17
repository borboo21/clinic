import { Request } from './models/request.js';

export async function getRequests() {
	const requests = await Request.find();
	return requests;
}
