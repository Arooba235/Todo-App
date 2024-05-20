import express from 'express';
import * as todoController from '../controllers/todo.controller';

const router = express.Router();

router.post('/', todoController.createtodo);
router.get('/', todoController.gettodo);
router.get('/:id', todoController.gettodoById);
router.patch('/:id', todoController.updatetodo);
router.delete('/:id', todoController.deletetodo);

export default router;
