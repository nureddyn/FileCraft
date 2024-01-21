const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Image = require('../../models/image');
const DocFile = require('../../models/docFile');
const bcrypt = require('bcrypt');
const fileConverter = require('../../features/fileConverter');

module.exports = {
    create,
    login,
    checkToken,
    craft,
    saveFile,
    getFiles,
    deleteFile,
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

async function deleteFile(req, res) {
  try {
    const fileId = req.body.fileId;
    Image.findByIdAndDelete(fileId)
    .then(doc => {
      doc 
      ? res.json({message: 'File removed successfully'})
      : res.json({message: 'File not found'});
    })
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getFiles(req, res) {
  try {
    // TODO: find by Id (there is an error here)
    const userId = req.body.userId;
    const images = await Image.find({ userId });
    const docs = await DocFile.find({ userId });

    const dataToSend = { images, docs };
    res.json(dataToSend);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// async function getFiles(req, res) {
//   try {
//     console.log(req.body);
//     // Image.findById({_id: req.body._id})
//     //   .then((images) => {
//     //     DocFile.findById({_id: req.body._id})
//     //       .then((docs) => {
//     //         const dataToSend = {images: images, docs: docs};
//     //         console.log(dataToSend)

//     //         res.json(dataToSend);
//     //       })
//     //   })
//   } catch(err) {}
// }

async function saveFile(req, res) {
  try {
    // Ensure the request has the uploaded file
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json('No file uploaded');
    }
    const file = req.files.file;
    const userId = req.body.userId;
    const imageId = req.body.imageId;

    let savedImage;
    if (imageId === 'null') {
      // Create a new image document
      const newImage = new Image({
        userId: userId,
        imageName: file.name,
        imageData: {
          data: file.data,
          contentType: file.mimetype
        }
      });
      // Save the image to MongoDB
      savedImage = await newImage.save();
    } else {
      // Update the existing image document
      savedImage = await Image.findByIdAndUpdate(
        imageId,
        {
          imageData: {
            data: file.data,
            contentType: file.mimetype
          }
        },
        { new: true }
      );
    }

    // Respond with the saved image details
    res.status(201).json({
      success: true,
      message: 'Image saved successfully',
      data: savedImage
    });

    // res.json(file);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
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
    const convertTo = req.body.convertTo;

    // Work on the file
    const convertedFile = await fileConverter.performCraft(file, craftType, convertTo);

    // Send the converted image back to the client
    res.json({ message: 'File converted successfully', convertedFile });
  } catch (err) {
    console.error(err);
    res.status(500).json('Internal Server Error');
  }
}

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