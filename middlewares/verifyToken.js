import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access Denied" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id, role 
    next();
  } catch {
    res.status(400).json({ error: "Invalid Token" });
  }
};


export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Admin only" });
  next();
};


export const isLibrarianOrAdmin = (req, res, next) => {
  if (req.user.role === "librarian" || req.user.role === "admin")
  {  
    next();}
  else
    res.status(403).json({ error: "Librarian or Admin only" });
};