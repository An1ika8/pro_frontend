const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).send({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY || 'tdghutdfgtwegbhhder');
        
        req.username = verified.username; 
        next();
    } catch (err) {
        res.status(400).send({ error: 'Invalid token' });
    }
};

module.exports = authenticateToken;