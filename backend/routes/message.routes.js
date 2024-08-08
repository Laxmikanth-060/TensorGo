import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { 

sendMessage,
allMessages,
        
 } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/:chatId',protectRoute,allMessages)
router.post('/',protectRoute,sendMessage)

export default router;