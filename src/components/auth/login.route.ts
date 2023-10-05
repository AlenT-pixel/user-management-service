import { Request, Response, Router } from "express"
import * as LoginController from './login.controller';
import multer from "multer";

class LoginRouter {
    private _router = Router()
    private _controller = LoginController;
    private storage = multer.diskStorage({
        destination: function (req, file, cb) {
          // Set your desired destination for the uploaded file
          cb(null, 'uploads/gallery_images');
        },
        filename: function (req, file, cb) {
          // Set the filename to the original name of the uploaded file
          cb(null, file.originalname);
        }
      });
    private upload = multer({ storage: this.storage });


    get router() {
        return this._router;
    }
    constructor() {
        this.userSubRoutes()
    }

    private userSubRoutes() {
        this._router.post('/', this.upload.none(), (req: Request, res: Response) => {
            this._controller.login(req.body, res)
        });
    }
}

export = new LoginRouter().router;