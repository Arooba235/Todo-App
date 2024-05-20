import { Request, Response } from 'express';

import * as todoService from '../services/todo.services';

export const createtodo = async (req: Request, res: Response) => {
	console.log(`Creating todo...`);
	const {
		bio,
		userId
	} = req.body;
	try {
		const newtodo = await todoService.createtodo({
			bio,
		    userId
		});
		console.log('Created todo:', newtodo);
		return res.status(201).json({
			message: 'Created todo',
			data: newtodo,
		});
	} catch (error) {
		console.error('Error creating todo:', error);
		return res.status(500).json({ error: 'Error creating todo' });
	}
};

export const gettodo = async (req: Request, res: Response) => {
	const todo = await todoService.gettodo();
	return res.status(200).json(todo);
};

export const gettodoById = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log(`Getting todo ${id}..`);
	try {
		const todo = await todoService.gettodoById(parseInt(id));
		return res.status(200).json({
			message: 'Item found',
			data: todo,
		});
	} catch (err) {
		console.error('Error fetching todo:', err);
		return res.status(500).json({ error: 'Error fetching todo' });
	}
};

export const updatetodo = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { bio,
		userId } =
		req.body;
	console.log(`Updating todo ${id}..`);

	try {
		const updatedtodo = await todoService.updatetodo(
			parseInt(id),
			{
				bio,
		        userId
			}
		);
		console.log('Updated todo:', updatedtodo);
		return res.status(200).json({
			message: 'Updated todo',
			data: updatedtodo,
		});
	} catch (err) {
		console.error('Error updating todo:', err);
		return res.status(500).json({ error: 'Error updating todo' });
	}
};

export const deletetodo = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log(`Deleting todo ${id}..`);
	try {
		const deletedtodo = await todoService.deletetodo(
			parseInt(id)
		);
		console.log('Deleted todo:', deletedtodo);
		return res.status(204).json({
			message: 'Deleted todo',
		});
	} catch (err) {
		console.error('Error deleting todo:', err);
		return res.status(500).json({ error: 'Error deleting todo' });
	}
};
