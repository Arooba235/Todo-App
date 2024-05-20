import express, { Request, Response } from 'express';

const home = express.Router();

home.get('/', (req: Request, res: Response) => {
	return res.status(200).json('Todo App Backend');
});

export default home;
