
import {Express, Request, Response} from "express";
import {authRouter} from "./routers/user.router";


export default function (app: Express) {
	app.get("/healthcheck", (request: Request, response: Response) => response.sendStatus(200));
	app.use("/user", authRouter);


}
