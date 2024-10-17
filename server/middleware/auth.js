import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants/constants.js';

export function auth(req, res, next) {
	try {
		const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

		const verifyResult = jwt.verify(token, JWT_SECRET);

		req.user = {
			email: verifyResult.email,
		};

		next();
	} catch (e) {
		return res.status(403).json({
			message: 'Нет доступа',
		});
	}
}
