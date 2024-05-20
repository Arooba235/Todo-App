import express from 'express';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.post('/', userController.createUser);
router.get('/', userController.getUser);
router.get('/:id', userController.getUserById);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;
