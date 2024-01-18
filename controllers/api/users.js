const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const sharp = require('sharp');

module.exports = {
    create,
    login,
    checkToken,
    craft
};

function createJWT(user) {
  const { _id, name, email, photo } = user;

  return jwt.sign(
    // data payload
    { 
      user: { 
        _id,
        name,
        email,
        photo: {
          data: photo.data,
          contentType: photo.contentType
        }
      }
    },
    process.env.SECRET,
    { expiresIn: '24h' }
  );
}

// Perform file craft
async function craft(req, res) {
  try {
    // Ensure the request has the uploaded file
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json('No file uploaded');
    }

    // Access the uploaded file from req.files
    const file = req.files.file;
    const craftType = req.body.craftType;

    // Work on the file
    performCraft(file, craftType);

    res.json({ message: 'File uploaded successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
}


function performCraft(file, craftType) {
  console.log(craftType);
};

async function create(req, res) {
  try {
    // Add the user to the database
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can use res.json to send back just a string
    // The client code needs to take this into consideration
    res.json(token);
    
  } catch (err) {
    // Client will check for non-2xx status code
    // 400 = Bad Request
    res.status(400).json(err);
  }
}

async function login(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json( createJWT(user) );
  } catch {
    res.status(400).json('Bad Credentials');
  }
}


async function checkToken(req, res) {
  // req.user will always be there for you when a token is sent
  console.log('req.user', req.user);
  res.json(req.exp);
}