const fs = require('fs');
const path = require('path');

require('dotenv').config();
require('./config/database');

const User = require('./models/user');

(async function() {

  await User.deleteMany({});

  // Helper function to read image file and convert to Buffer
  const readImage = (imageName) => {
    const imagePath = path.join(__dirname, 'images', imageName); // Adjust the path as needed
    const imageBuffer = fs.readFileSync(imagePath);
    return {
      data: imageBuffer,
      contentType: 'image/png' // Adjust the content type based on your image format
    };
  };

  const users = await User.create([
    {name: 'Carlos', email:10, password: 111, photo: readImage('profile_photo.png')},
    // {name: 'David', email: 20, password: 222, photo:},
    // {name: 'Jim', email:30, password: 333, photo:},
    // {name: 'Darko', email: 40, password: 444, photo:},
    // {name: 'Tito', email: 50, password: 555, photo:},
    // {name: 'John', email: 60, password: 666, photo:},
    // {name: 'Susan', email: 70, password: 777, photo:},
    // {name: 'Sam', email: 80, password: 888, photo:},
    // {name: 'Tom', email: 90, password: 999, photo:},
  ]);

  console.log(users);

  process.exit();

})();