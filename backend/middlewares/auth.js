const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const authUser = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Unauthorised", 401)
    }
    const token = req.headers.authorization.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userId = decoded.userId;
        req.token = token
        next();
    } catch (error) {
        if (token === 'null') { 
            
            throw new AppError('Login Required.', 401); 
        }
        else {
            throw new AppError('Invalid Token.', 401)
        }
        //res.status(401).json({ message: 'Invalid Token' });
    }
};

module.exports = {
    authUser
}
