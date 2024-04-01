const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const bcrypt = require('bcrypt');

module.exports.signup = async(req, res) => {
    
    const { username, password } = req.body;
    try {
        const user = await User.create({ username, password });
        console.log(user);
        const token = authMiddleware.generateAccessToken(username);
        res.status(201).json(token);
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
        res.status(201).json(token);
      } catch (error) {
        res.send(error);
      }
}
