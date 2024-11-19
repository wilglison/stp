"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.jwtMiddleware = void 0;
const express_jwt_1 = require("express-jwt");
const JWT_SECRET = process.env.JWT_SECRET || "stp123";
const jwtMiddleware = (0, express_jwt_1.expressjwt)({
    secret: JWT_SECRET,
    algorithms: ["HS256"],
    requestProperty: "auth",
});
exports.jwtMiddleware = jwtMiddleware;
const checkRole = (requiredRoles) => {
    return (req, res, next) => {
        const user = req.auth;
        if (!(user === null || user === void 0 ? void 0 : user.roles)) {
            return res.status(401).json({
                error: "Unauthorized - No roles defined",
            });
        }
        const userRoles = Array.isArray(user.roles) ? user.roles : [user.roles];
        const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));
        if (!hasRequiredRole) {
            return res.status(403).json({
                error: "Forbidden - Insufficient permissions",
            });
        }
        next();
    };
};
exports.checkRole = checkRole;
