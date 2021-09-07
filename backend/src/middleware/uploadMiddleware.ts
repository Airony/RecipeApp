import { UPLOAD_DEST } from "./../config/server.config";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    cb(null, UPLOAD_DEST);
  },
  filename: function (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) {
    const extension = file.mimetype.match(/(?<=\/)(\w+)/)![1];
    cb(null, Date.now() + "." + extension);
  },
});

export default multer({ storage: storage });
