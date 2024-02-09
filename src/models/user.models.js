const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email address"
        }
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: [true, "Phone number must be unique"],
        validate: {
            validator: function (v) {
                return /^\+91\s\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number! Please enter a phone number in the format +91 1234567890.`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [4, "Password should be of atleast 4 characters"],
        validate: {
            validator: function (value) {
                return !value.toLowerCase().includes("password");
            },
            message: `Password should not contain "password"`
        }
    },
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: 'Role must be either "user" or "admin"'
        },
        default: "user"
    },
    token: {
        type: String
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.toJSON = function () {
    const userObject = this.toObject();
    delete userObject._id;
    delete userObject.password;
    delete userObject.__v;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    
    return userObject;
}

const User = mongoose.model("User", userSchema);

module.exports = User;