"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidate = void 0;
const express_validator_1 = require("express-validator");
const handleValidate = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 'fail', msg: errors.array()[0].msg });
    }
};
exports.handleValidate = handleValidate;
