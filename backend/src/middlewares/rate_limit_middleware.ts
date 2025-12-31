import { rateLimit } from "express-rate-limit";

//Limits backend API calls per opened page
export const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50, // Limit each IP to 50 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
  
  message: "Too many Request, please try again later",
  
  handler: (req, res, next, options) => {
    return res.status(options.statusCode).json({
      success: false,
      message: options.message, // <- the message above
      retryAfter: res.getHeader("Retry-After") || null, // optional
    });
  },
  
});
