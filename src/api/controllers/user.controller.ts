import { Request, Response } from 'express';
import * as userService from '../services/user.services';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
	console.log(`Creating user...`);
	const {
		email,
		name,
		role,
		password
	} = req.body;
	try {
		const newuser = await userService.createUser({
			email,
            name,
            role,
            password
		});
		console.log('Created user:', newuser);
		const accessToken=jwt.sign({'userId':newuser.id},'jwt-access-token-secret-key',{expiresIn:'1h'});
		const refreshToken=jwt.sign({'userId':newuser.id},'jwt-access-token-secret-key',{expiresIn:'5m'});
		res.cookie('accessToken',accessToken,{maxAge:3600000});
		res.cookie('accessToken',accessToken,{maxAge:300000, httpOnly: true, secure:true, sameSite:'strict'});
	
		return res.status(201).json({
			message: 'Created user',
			data: newuser,
		});
	} catch (error) {
		console.error('Error creating user:', error);
		return res.status(500).json({ error: 'Error creating user' });
	}
};

export const getUser = async (req: Request, res: Response) => {
	const accesstoken=req.cookies.accessToken;
	if (!accesstoken) {
		return res.status(401).json({ error: 'No token provided' });
	  }
	  try {
		const result = jwt.verify(accesstoken, "jwt-access-token-secret-key");
		console.log(result);
	
		const user = await userService.getUser();
		return res.status(200).json(user);
	  } catch (error) {
		console.error('JWT verification error:', error);
		return res.status(401).json({ error: 'Invalid token' });
	  }
	
};

export const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log(`Getting user ${id}..`);
	try {
		const user = await userService.getUserById(parseInt(id));
		return res.status(200).json({
			message: 'Item found',
			data: user,
		});
	} catch (err) {
		console.error('Error fetching user:', err);
		return res.status(500).json({ error: 'Error fetching user' });
	}
};

export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { email,
		name,
		role,
		password } =
		req.body;
	console.log(`Updating user ${id}..`);

	try {
		const updateduser = await userService.updateUser(
			parseInt(id),
			{
				email,
                name,
                role,
                password
			}
		);
		console.log('Updated user:', updateduser);
		return res.status(200).json({
			message: 'Updated user',
			data: updateduser,
		});
	} catch (err) {
		console.error('Error updating user:', err);
		return res.status(500).json({ error: 'Error updating user' });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log(`Deleting user ${id}..`);
	try {
		const deleteduser = await userService.deleteUser(
			parseInt(id)
		);
		console.log('Deleted user:', deleteduser);
		return res.status(204).json({
			message: 'Deleted user',
		});
	} catch (err) {
		console.error('Error deleting user:', err);
		return res.status(500).json({ error: 'Error deleting user' });
	}
};
