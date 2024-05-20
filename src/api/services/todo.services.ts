import { PrismaClient, Todos } from '@prisma/client';

import NotFoundException from '../shared/exceptions/NotFoundException';

import CreatetodoDto from '../interfaces/createtodo';
import UpdatetodoDto from '../interfaces/updatetodo';

const prisma = new PrismaClient();

export const createtodo = async (
	data: CreatetodoDto
): Promise<Todos> => {
	const newtodo = await prisma.todos.create({
		data: { ...data },
	});
	return newtodo;
};

export const gettodo = async (): Promise<Todos[]> => {
	const todo = await prisma.todos.findMany();
	return todo;
};

export const gettodoById = async (
	id: number
): Promise<Todos | null> => {
	if (!(await doestodoExist(id))) {
		throw new NotFoundException(`todo with id ${id} not found`);
	}
	const todo = await prisma.todos.findUnique({
		where: { id },
	});
	return todo;
};

export const updatetodo = async (
	id: number,
	data: UpdatetodoDto
): Promise<Todos> => {
	if (!(await doestodoExist(id))) {
		throw new NotFoundException(`todo with id ${id} does not exist`);
	}

	const updatedtodo = await prisma.todos.update({
		where: { id },
		data: { ...data },
	});
	return updatedtodo;
};

export const deletetodo = async (id: number): Promise<Todos> => {
	if (!(await doestodoExist(id))) {
		throw new NotFoundException(`todos with id ${id} does not exist`);
	}

	const deletedtodo = await prisma.todos.delete({
		where: { id },
	});
	return deletedtodo;
};

export const doestodoExist = async (id: number): Promise<boolean> => {
	return (await prisma.todos.findUnique({ where: { id } })) !== null;
};
