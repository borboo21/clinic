import { User } from './models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from './constants/constants.js';

export async function loginUser(email, password) {
	const user = await User.findOne({ email });

	if (!user) {
		throw new Error('Неверный логин');
	}

	const isPasswordCorrect = await bcrypt.compare(password, user.password);

	if (!isPasswordCorrect) {
		throw new Error('Неверный логин или пароль');
	}

	return jwt.sign({ email }, JWT_SECRET, { expiresIn: '30d' });
}
