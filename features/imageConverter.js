const sharp = require('sharp');

module.exports = {
    performCraft
};

const options = ["jpeg", "png", "webp", "tiff", "giff", "svg", "raw"];

const craftFunctions = {
    'ImageConverter': imageConverter,
    // 'ImageFilters': imageFilters,
    // 'DocumentConverter': documentConverter,
    // 'FileSharing': fileSharing,
}

async function imageConverter(file, convertTo) {
    const convertedBuffer = await sharp(file.data)
      .toFormat(convertTo)
      .toBuffer();
    
    return convertedBuffer;
};

async function performCraft(file, craftType, convertTo = null) {

    try {
        return craftFunctions[craftType](file, convertTo);
    } catch (error) {
        console.error(error);
        throw new Error('Error during image processing');
    }

    // try {
    //   // Convert image using sharp based on the specified conversion type
    //   if (convertTo === 'jpg') {
    //     const convertedBuffer = await sharp(file.data)
    //       .toFormat('jpeg')
    //       .toBuffer();
        
    //     return convertedBuffer;
    //   } else if (convertTo === 'png') {
    //     // Add additional conversion types as needed
    //     const convertedBuffer = await sharp(file.data)
    //       .toFormat('png')
    //       .toBuffer();
  
    //     return convertedBuffer;
    //   } else {
    //     throw new Error('Unsupported conversion type');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   throw new Error('Error during image conversion');
    // }
  }