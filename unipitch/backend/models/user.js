const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    // Only hash the password if it is modified or new
    if (!this.isModified('password')) return next();

    // Check if the password is already hashed
    const isHashed = this.password.startsWith('$2');

    if (!isHashed) {
        // If not hashed, hash the password
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
});

module.exports = mongoose.model('User', UserSchema);
