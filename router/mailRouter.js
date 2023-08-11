import express from 'express';
import {
    sendEmail,
    subscribe,
    unsubscribe,
    verifyCode,
    sendVerificationCode,
} from '../controllers/mailController.js';

const router = express.Router();

router.post('/send-email', sendEmail);
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);
router.post('/verify-code', verifyCode);
router.post('/send-verification-code', sendVerificationCode);

export default router;
