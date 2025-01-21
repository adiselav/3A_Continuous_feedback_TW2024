const jwt = require('jsonwebtoken');

const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required. Please provide a valid token.'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Verifică dacă token-ul a expirat
        if (Date.now() >= decoded.exp * 1000) {
            return res.status(401).json({
                success: false,
                message: 'Token has expired. Please login again.'
            });
        }

        // Adaugă informațiile complete despre utilizator în request
        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
            iat: decoded.iat,
            exp: decoded.exp
        };

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(403).json({
                success: false,
                message: 'Invalid token format or signature.'
            });
        }
        
        return res.status(500).json({
            success: false,
            message: 'An error occurred while authenticating.',
            error: error.message
        });
    }
};

module.exports = authenticateToken;
