const jwt = require('jsonwebtoken');
const jwtToken = process.env.ACCESS_TOKEN;

module.exports.generateAccessToken = (user) => {
    console.log(user);
    return jwt.sign({ username: user }, jwtToken , {
		expiresIn: "7d"
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