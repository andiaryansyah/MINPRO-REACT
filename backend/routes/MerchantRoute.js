import express from "express";
import { getMerchants, Register, Login, Logout, getMerchantId, deleteMerchant} from "../handlers/Merchants.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../handlers/refreshToken.js";

const router = express.Router();
router.get('/users', verifyToken, getMerchants);
router.get('/users/:id', verifyToken, getMerchantId);
router.delete('/users/:id', deleteMerchant);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);

export default router;