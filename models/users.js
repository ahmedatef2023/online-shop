const mongoose = require('mongoose')
const {isEmail} = require("validator")
const bcrypt = require('bcrypt')
mongoose.set('strictQuery', true)


const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
		match: [/^[A-Za-z][A-Za-z0-9_]{2,29}$/g, '{VALUE} must contain only alphanumeric characters or underscores with length (3,30)']
	},
	email: {
		type: String,
		trim:true,
		required: true,
		index:
		{unique: true},
		lowercase: true,
		validate: [ isEmail, 'invalid email' ]
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
		trim: true,

	},
	isAdmin:{
		type:Boolean,
		default: false,
	},
})

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) user.password = await bcrypt.hash(user.password, 10);

	next();
});

const user = mongoose.model('user', userSchema)
module.exports = user