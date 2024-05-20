import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import home from './api/routes/home.routes';
import userRouter from './api/routes/user.routes';
import todoRouter from './api/routes/todo.routes';

dotenv.config();
console.log(`ENVIRONMENT: ${process.env.NODE_ENV}`);

const app: Express = express();

const corsOptions: cors.CorsOptions = {
	origin: (
		origin: string | undefined,
		callback: (error: Error | null, allow?: boolean) => void
	) => {
		const allowedOrigins = [
			'http://localhost:3000', // Your local development
			// Add other allowed origins as needed
		];

		if (!origin || allowedOrigins.includes(origin)) {
			callback(null, true);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use('/', home);
app.use('/user',userRouter)
app.use('/todo',todoRouter)

// Start the Express server
const port = process.env.SERVER_PORT || 8001;
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
