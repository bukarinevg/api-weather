const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

module.exports.signup = async(req, res) => {
    
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password });
        console.log(user);
        const token = authMiddleware.generateAccessToken(username);
        const refreshToken = authMiddleware.generateRefreshToken(username);
        res.status(201).json({
            accessToken: token,
            refreshToken: refreshToken
        });
    } catch (error) {
        res.status(400).json({ message:error.message });
    }
}



module.exports.login = async(req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username: username });
        if (!user || !password || ! await bcrypt.compare(password, user.password)  ) {
          return res.status(400).send({ error: 'Invalid login credentials' });
        }
        const token = authMiddleware.generateAccessToken(username);
        res.status(201).json({
          accessToken: token
        });
      } catch (error) {
        res.send(error);
      }
}

module.exports.refreshToken = async(req, res) => {
    const refreshToken = req.body.token;
    const accessToken = authMiddleware.verifyRefreshToken(refreshToken);
    console.log(accessToken);
    if(!accessToken) return res.sendStatus(403);
    res.json({ accessToken: accessToken });
    // if (!refreshToken.includes(refreshToken)) return res.sendStatus(403);
    // jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
    //     if (err) return res.sendStatus(403);
    //     const accessToken = authMiddleware.generateAccessToken({ username: user.username });
    //     res.json({ accessToken: accessToken });
    // });
}
