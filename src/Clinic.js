import { Route, Routes } from 'react-router-dom';
import { Form, Login, TableRequests } from './pages';

export const Clinic = () => {
	return (
		<Routes>
			<Route path="/" element={<Form />} />
			<Route path="/login" element={<Login />} />
			<Route path="/requests" element={<TableRequests />} />
		</Routes>
	);
};
