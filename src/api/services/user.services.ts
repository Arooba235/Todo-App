import { PrismaClient, User } from '@prisma/client';
import NotFoundException from '../shared/exceptions/NotFoundException';
import CreateuserDto from '../interfaces/createUser';
import UpdateuserDto from '../interfaces/updateUser';


const prisma = new PrismaClient();

export const createUser = async (
	data: CreateuserDto
): Promise<User> => {
	const newuser = await prisma.user.create({
		data: { ...data },
	});
	
	return newuser;

};

export const getUser = async (): Promise<User[]> => {
	const user = await prisma.user.findMany();
	return user;
};

export const getUserById = async (
	id: number
): Promise<User | null> => {
	if (!(await doesuserExist(id))) {
		throw new NotFoundException(`user with id ${id} not found`);
	}
	const user = await prisma.user.findUnique({
		where: { id },
	});
	return user;
};

export const updateUser = async (
	id: number,
	data: UpdateuserDto
): Promise<User> => {
	if (!(await doesuserExist(id))) {
		throw new NotFoundException(`user with id ${id} does not exist`);
	}

	const updateduser = await prisma.user.update({
		where: { id },
		data: { ...data },
	});
	return updateduser;
};

export const deleteUser = async (id: number): Promise<User> => {
	if (!(await doesuserExist(id))) {
		throw new NotFoundException(`users with id ${id} does not exist`);
	}

	const deleteduser = await prisma.user.delete({
		where: { id },
	});
	return deleteduser;
};

export const doesuserExist = async (id: number): Promise<boolean> => {
	return (await prisma.user.findUnique({ where: { id } })) !== null;
};
