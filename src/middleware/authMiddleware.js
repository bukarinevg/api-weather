const jwt = require('jsonwebtoken');
const jwtToken = process.env.ACCESS_TOKEN;
const jwtRefreshToken = process.env.REFRESH_TOKEN;

module.exports.generateAccessToken = (user) => {
    console.log(user);
    return jwt.sign({ username: user }, jwtToken , {
		expiresIn: "7d"
	});
} 

module.exports.generateRefreshToken = (user) => {
    return jwt.sign({ username: user }, jwtRefreshToken);

}

module.exports.verifyRefreshToken = (refreshToken, user) => {
    if (!refreshToken) return false;
    return jwt.verify(refreshToken, jwtRefreshToken, (err, user) => {
        if (err) return false;
        const accessToken = module.exports.generateAccessToken({ username: user.username });
        return accessToken;
    });
   
}

module.exports.authenticateToken = async(req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, jwtToken, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}