import { Router } from "express";
import userRoute from "../components/user/user.route";
import loginRoute from "../components/auth/login.route";
import { verifyJwt } from "../middlewares/auth.middleware";

class MainRouter {
    private _router = Router();
    private _subUserRouter = userRoute;
    private _subLoginRouter = loginRoute;

    constructor() {
        this._configure();
    }

    get router() {
        return this._router;
    }

    private _configure() {
        this._router.get(`/verify`, verifyJwt, (req, res) => {
          res.send({ status: 200, message: "Service is running" });
        });
        this._router.use(`/user`, this._subUserRouter);
        this._router.use(`/login`, this._subLoginRouter);
      }

}

export = new MainRouter().router;