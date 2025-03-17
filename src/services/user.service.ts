import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Session from '../models/session.model';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key'; // Ensure to use a secure value in production.
const SALT_ROUNDS = 10;

class AuthService {
	/**
	 * Register a new user.
	 * @param email - The user's email.
	 * @param password - The user's password.
	 * @param name - Optional user name.
	 * @returns An object containing the created user and a JWT token.
	 */
	async register(email: string, password: string, name?: string) {
		// Check if the user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new Error('User already exists');
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const user = await User.create({ email, password: hashedPassword, name });

		// Generate a JWT token (without expiration)
		const token = jwt.sign({ id: user._id }, JWT_SECRET);

		// Create a session for the user with the generated token
		await Session.create({ user: user._id, token });

		return { user, token };
	}

	/**
	 * Log in an existing user.
	 * @param email - The user's email.
	 * @param password - The user's password.
	 * @returns An object containing the user and a JWT token.
	 */
	async login(email: string, password: string) {
		// Retrieve the user by email
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error('Invalid credentials');
		}

		// Compare the provided password with the stored hash
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid credentials');
		}

		// Generate a new JWT token
		const token = jwt.sign({ id: user._id }, JWT_SECRET);

		// Store the token in a new session document
		await Session.create({ user: user._id, token });

		return { user, token };
	}

	/**
	 * Log out a user by removing the session corresponding to the token.
	 * @param token - The JWT token to invalidate.
	 * @returns A success confirmation.
	 */
	async logout(token: string) {
		const result = await Session.deleteOne({ token });
		if (result.deletedCount === 0) {
			throw new Error('Invalid token or already logged out');
		}
		return { success: true };
	}
}

export default new AuthService();
