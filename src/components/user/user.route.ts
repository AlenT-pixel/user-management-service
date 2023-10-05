import { Request, Response, Router } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyJwt } from "../../middlewares/auth.middleware";
import * as UserController from './user.controller';
import multer from "multer";

class UserRouter {
    private _router = Router()
    private _controller = UserController;
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
        this._router.post('/', this.upload.none(),  (req: Request, res: Response) => {
            this._controller.addUser(req.body, res)
        });
        this._router.get('/', (req: Request, res: Response) => {
            this._controller.getUsers(req.query, res)
        });
        this._router.get('/:id', (req: Request, res: Response) => {
            this._controller.getUserById(req.params, res)
        });
        this._router.put('/:id', verifyJwt, this.upload.none(), (req: Request, res: Response) => {
            let requestData = req.body;
            requestData.id = req.params.id;
            this._controller.updateUser(requestData, res)
        });
        this._router.delete('/:id', verifyJwt, (req: Request, res: Response) => {
            this._controller.deleteUser(req.params.id, res)
        });
    }
}

export = new UserRouter().router;