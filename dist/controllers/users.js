"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.getAllUsers = void 0;
const users_1 = require("../db/users");
const getAllUsers = async (req, res) => {
    try {
        const users = await (0, users_1.getUsers)();
        return res.status(200).json(users).end();
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(400);
    }
};
exports.getAllUsers = getAllUsers;
const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (typeof id !== 'string') {
            return res.sendStatus(400);
        }
        const deletedUser = await (0, users_1.deleteUserById)(id);
        return res.json(deletedUser);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.deleteUser = deleteUser;
const updateUser = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const { username } = req.body;
        if (!id || typeof id !== 'string' || !username || typeof username !== 'string') {
            return res.sendStatus(400);
        }
        const user = await (0, users_1.getUserById)(id);
        if (!user) {
            return res.sendStatus(404);
        }
        user.username = username;
        await user.save();
        return res.status(200).json(user).end();
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=users.js.map