import multer from "multer";
import { TEMP_UPLOAD_DIR } from "../constants/index.js";
import { randomUUID } from "crypto";

const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        cb(null, TEMP_UPLOAD_DIR);
    },
    filename: (req, file, cb) => { 
        const uniqueSuffix = randomUUID();
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

export const upload = multer({ storage });