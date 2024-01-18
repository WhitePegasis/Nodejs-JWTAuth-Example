const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser')

const app = express();
const PORT = 3001;

// In-memory storage for user data
const users = [];

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieParser());

app.use(bodyParser.json());


const authenticateUser = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookies
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

  try {
    const decoded = jwt.verify(token, 'secretKey');
    req.user = decoded;

    console.log("User: ", req.user, " accessed private data!");

    next();
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, 'secretKey', { expiresIn: '1h' });

  res.cookie('token', token);

  res.send({ token });

  console.log("User: ", username, " got logged in!");
});

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (users.some(u => u.username === username)) {
      return res.status(400).json({ message: 'Username is already taken.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword };
    users.push(newUser);

    res.json({ message: 'Signup successful. You can now log in.' });
  } catch (error) {
    console.error('Signup failed:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.get('/protected', authenticateUser, (req, res) => {
  res.json({ message: 'You have access to this protected route.', user: req.user });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
