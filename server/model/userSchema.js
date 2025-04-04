var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    work: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    cpassword: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    emp_id: {
        type: String,
        require: true,
    },
    position: {
        type: String,
        require: true,
    },
    technology: {
        type: String,
        require: true,
    },
    messages: [
        {
            name: {
                type: String,
                require: true,
            },
            email: {
                type: String,
                require: true,
            },
            phone: {
                type: Number,
                require: true,
            },
            message: {
                type: String,
                require: true,
            },
        }
    ],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// hashing the password 
userSchema.pre('save', async function (next) {

    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// Generate Token 
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}
// contact page - store the message
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;
        
    } catch (err) {
        console.log(err);
    }
}
// Update contact details - store the message
userSchema.methods.updateData = async function (name, phone, message) {
    try {
        this.userSchema = this.userSchema.concat({ name, phone, message });
        await this.save();
        return this.userSchema;
        
    } catch (err) {
        console.log(err);
    }
}

const user = mongoose.model('USER', userSchema);
module.exports = user;