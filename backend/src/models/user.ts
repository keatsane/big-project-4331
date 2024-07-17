import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UserType } from "../types/user";

const userSchema = new mongoose.Schema<UserType>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		userName: { type: String, required: true, unique: true, index: true },
		email: { type: String, required: true, unique: true, index: true },
		password: { type: String, required: true },
		verified: { type: Boolean, default: false },
		verificationToken: { type: String, default: "" },
		resetToken: { type: String, default: "" },
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 8);
	}
	next();
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
