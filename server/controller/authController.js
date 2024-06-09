const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const toast = require("react-hot-toast");

const register = async (req, res) => {
  const { username, password, repeatpassword } = req.body;

  try {
    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });

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
      return res.json({ error: "Invalid username or username does not exist" });
    }

    const userID = user.id;

    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign(
        { username: user.username, id: user.id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("token", token, { httpOnly: true }).json(user);
    } else {
      return res.json({ error: "Incorrect username or password" });
    }
  } catch (error) {
    console.error("Server error (Login)", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const signout = async (req, res) => {
  try {
    res.clearCookie("token");
    console.log("token has been cleared");
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to clear token" });
  }
};

const saveProgress = async (req, res) => {
  const { userId, completedExercises } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        progress: completedExercises,
      },
    });

    res.status(200).json('Progress saved successfully');
  } catch (error) {
    console.error('Error saving progress:', error);
    res.status(500).json('Error saving progress');
  }
};

const getProgress = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { progress: true },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ progress: user.progress });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return res.status(500).json({ error: 'Error fetching progress' });
  }
};

const savePhoto = async (req, res) => {
  const userId = req.params.userId;
  const { imageData } = req.body;

  // Decode base64 image data
  const base64Data = imageData.replace(/^data:image\/jpeg;base64,/, "");
  const binaryData = Buffer.from(base64Data, "base64");

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        photo: binaryData, // Assuming you have a field named 'photo' in your user model
      },
    });
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Error saving photo:", error);
    res.status(500).json({ success: false, error: "Error saving photo" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true }
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Error fetching users" });
  }
};

const getUserPhoto = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { photo: true },
    });

    if (!user || !user.photo) {
      return res.status(404).json({ error: 'Photo not found' });
    }

    // Convert the photo buffer to a base64 string
    const base64Photo = user.photo.toString('base64');
    res.status(200).json({ photo: base64Photo });
  } catch (error) {
    console.error('Error fetching user photo:', error);
    res.status(500).json({ error: 'Error fetching user photo' });
  }
};

const loginWithId = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ error: "User does not exist" });
    }

    const token = jwt.sign(
      { username: user.username, id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.cookie("token", token, { httpOnly: true }).json({ success: true, id: user.id, ...user }); // Include user object in the response JSON
  } catch (error) {
    console.error("Server error (Login with ID)", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login, signout, saveProgress, getProgress, savePhoto, getUserPhoto, getUsers, loginWithId};
