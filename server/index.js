import express, { urlencoded } from 'express';
import { connect } from 'mongoose';
import { auth } from './middleware/auth.js';
import { Request } from './models/request.js';
import { loginUser } from './user-controller.js';
import { getRequests } from './request-controller.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const port = 3001;
const app = express();

app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
	res.send('hello world!');
});

app.post('/form', async (req, res) => {
	try {
		const doc = new Request({
			fullName: req.body.fullName,
			phoneNumber: req.body.phoneNumber,
			problem: req.body.problem,
		});
		const request = await doc.save();
		res.json(request);
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось отправить заявку',
		});
	}
});

app.post('/login', async (req, res) => {
	try {
		const token = await loginUser(req.body.email, req.body.password);

		res.cookie('token', token, { httpOnly: true });

		res.json({
			email: req.body.email,
			token,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Неверный логин или пароль',
		});
	}
});

app.use(auth);

app.get('/requests', async (req, res) => {
	try {
		res.json(await getRequests());
	} catch (err) {
		console.log(err);
		res.status(500).json({
			message: 'Не удалось извлечь данные',
		});
	}
});

connect(
	'mongodb+srv://bor_boo:qwerty123@cluster0.trqbh.mongodb.net/clinic?retryWrites=true&w=majority&appName=Cluster0',
).then(() => {
	app.listen(port, () => {
		console.log('Server has been started on port ' + port);
	});
});
