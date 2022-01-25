const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
	console.log(err.message, err.code);
	let errors = { email: "", password: "" };

	// incorrect email
	if (err.message === "incorrect email") {
		errors.email = "That email is not registered";
	}

	// incorrect password
	if (err.message === "incorrect password") {
		errors.password = "That password is incorrect";
	}

	// duplicate email error
	if (err.code === 11000) {
		errors.email = "That email/username is already registered";
		return errors;
	}

	// validation errors
	if (err.message.includes("user validation failed")) {
		// console.log(err);
		Object.values(err.errors).forEach(({ properties }) => {
			// console.log(val);
			// console.log(properties);
			errors[properties.path] = properties.message;
		});
	}

	return errors;
};

//REGISTER
router.post("/register", async (req, res) => {
	console.log(`in register`);

	const newUser = new User({
		username: req.body.username,
		email: req.body.email,
		password: CryptoJS.AES.encrypt(
			req.body.password,
			process.env.PASS_SEC
		).toString(),
	});

	try {
		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
});

//LOGIN

router.post("/login", async (req, res) => {
  
	try {
		const user = await User.findOne({ username: req.body.username });

		!user && res.status(401).json("Wrong credentials!");

		const hashedPassword = CryptoJS.AES.decrypt(
			user.password,
			process.env.PASS_SEC
		);

		const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

		OriginalPassword !== req.body.password &&
			res.status(401).json("Wrong credentials!");

		const accessToken = jwt.sign(
			{
				id: user._id,
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SEC,
			{ expiresIn: "3d" }
		);

		const { password, ...others } = user._doc;

		res.status(200).json({ ...others, accessToken });
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).json({ errors });
	}
});

module.exports = router;
