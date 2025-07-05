import { Router } from "express";
import {
            getContactsController,
            getContactByIdController,
            createContactController,
            updateContactController,
            deleteContactController,
        } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { createContactSchema, updateContactSchema } from "../validation/contacts.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/multer.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
    
contactsRouter.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post(
    '/contacts',
    upload.single('photo'),
    validateBody(createContactSchema),
    ctrlWrapper(createContactController),
    );

contactsRouter.patch(
    '/contacts/:contactId',
    upload.single('photo'),
    validateBody(updateContactSchema),
    isValidId,
    ctrlWrapper(updateContactController),
    );

contactsRouter.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;  