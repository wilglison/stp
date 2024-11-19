import { Request, Response, NextFunction } from "express";
import { expressjwt as jwt } from "express-jwt";

const JWT_SECRET = process.env.JWT_SECRET || "stp123";
const jwtMiddleware = jwt({
  secret: JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

const checkRole = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).auth;

    if (!user?.roles) {
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

export { jwtMiddleware, checkRole };
