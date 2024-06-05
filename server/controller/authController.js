const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const toast = require('react-hot-toast');

const register = async (req, res) => {
  const { username, password, repeatpassword } = req.body;

  try {
    const usernameExists = await prisma.user.findUnique({ where: { username } });

    if (usernameExists) {
      return res.json({ error: "Username already exists" });
    }

    if (repeatpassword !== password) {
      return res.json({ error: "Passwords do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res.json(user);
  } catch (error) {
    console.log("Server error (Register)", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.json({ error: 'Invalid username or username does not exist' });
    }

    const userID = user.id;





    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie('token', token, { httpOnly: true }).json(user);
    } else {
      return res.json({ error: 'Incorrect username or password' });
    }
  } catch (error) {
    console.error("Server error (Login)", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const signout = async( req,res) => {
  try {
    res.clearCookie('token');
    console.log("token has been cleared")
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to clear token" });
  }
}



module.exports = { register, login,signout };