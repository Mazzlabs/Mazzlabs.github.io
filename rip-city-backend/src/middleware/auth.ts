import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    tier?: string;
  };
}

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  // Basic auth middleware placeholder
  req.user = { id: 'demo_user', email: 'demo@example.com', tier: 'free' };
  next();
};

export const requireSubscription = (minimumTier: 'pro' | 'premium' | 'enterprise') => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    next();
  };
};

// Export for compatibility
export const authMiddleware = authenticateToken;
