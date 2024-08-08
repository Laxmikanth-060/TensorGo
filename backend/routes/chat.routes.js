import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js';
import { 
accessChat,
fetchChats,
createGroupChat,
renameGroup,
removeFromGroup,
addToGroup
 } from '../controllers/chat.controller.js';

const router = express.Router();

router.post("/",protectRoute,accessChat);
router.get("/",protectRoute,fetchChats);
router.post("/group",protectRoute,createGroupChat);
router.put("/rename",protectRoute,renameGroup);
router.put("/removefromgroup",protectRoute,removeFromGroup);
router.put("/addtogroup",protectRoute,addToGroup);
// router.put("/chatDelete",protectRoute,chatDelete)

export default router;