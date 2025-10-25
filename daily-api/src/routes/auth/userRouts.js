import express from 'express';
import { createUser, updateUsertype } from '../../controllers/userController.js';

const router = express.Router();

router.post('/', createUser);
router.put('/update-tipo', updateUsertype);

export default router;