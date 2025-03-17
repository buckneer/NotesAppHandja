import { Request, Response } from "express";
import AuthService from "../services/user.service";
import log from "../logger";

/**
 * Register a new user.
 */
export async function handleRegister(req: Request, res: Response) {
	try {
		const { email, password, name } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		const response = await AuthService.register(email, password, name);
		return res.status(201).json(response);
	} catch (e: any) {
		log.error(e.message);
		return res.status(400).json({ message: e.message });
	}
}

/**
 * Log in a user.
 */
export async function handleLogin(req: Request, res: Response) {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ message: "Email and password are required" });
		}

		const response = await AuthService.login(email, password);
		return res.status(200).json(response);
	} catch (e: any) {
		log.error(e.message);
		return res.status(401).json({ message: e.message });
	}
}

/**
 * Log out a user.
 */
export async function handleLogout(req: Request, res: Response) {
	try {
		const { token } = req.body;
		if (!token) {
			return res.status(400).json({ message: "Token is required" });
		}

		const response = await AuthService.logout(token);
		return res.status(200).json(response);
	} catch (e: any) {
		log.error(e.message);
		return res.status(400).json({ message: e.message });
	}
}
