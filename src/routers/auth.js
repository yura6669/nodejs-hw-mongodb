import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
    registerUserSchema,
    loginUserSchema,
    requestResetEmailSchema,
    resetPasswordSchema,
} from "../validation/auth.js";
import {
    registerUserController,
    loginUserController,
    refreshUserSessionController,
    logoutUserController,
    requestResetEmailController,
    resetPasswordController,
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";

const authRouter = Router();

authRouter.post('/auth/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController));

authRouter.post('/auth/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));

authRouter.post('/auth/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post('/auth/logout', ctrlWrapper(logoutUserController));

authRouter.post('/auth/send-reset-email', validateBody(requestResetEmailSchema), ctrlWrapper(requestResetEmailController));

authRouter.post('/auth/reset-pwd', validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export default authRouter;