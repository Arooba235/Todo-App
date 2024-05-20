export default class AlreadyExistsException extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.name = 'AlreadyExistsException';
		this.statusCode = 409;
	}
}
