const sharp = require('sharp');
const mammoth = require('mammoth');
const { exec } = require('child_process');

module.exports = {
    performCraft
};

const craftFunctions = {
    'ImageConverter': imageConverter,
    // 'ImageFilters': imageFilters,
    'DocumentConverter': documentConverter,
    // 'FileSharing': fileSharing,
}

const ImageOptions = ["jpeg", "png", "webp", "tiff", "giff", "svg", "raw"];

async function imageConverter(file, convertTo) {
    const convertedBuffer = await sharp(file.data)
    //   .toFormat(ImageOptions.includes(convertTo) && convertTo)
      .toFormat(convertTo)
      .toBuffer();
    
    return convertedBuffer;
};

const DocumentOptions = ["doc", "docx", "pdf"];

async function documentConverter(file, convertTo) {
    try {
        // Check if the selected conversion option is valid
        if (!DocumentOptions.includes(convertTo)) {
          throw new Error('Invalid conversion option');
        }
    
        // Determine the conversion method based on the selected format
        if (convertTo === 'docx' && file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
          // Convert DOCX to HTML using mammoth
          const result = await mammoth.extractRawText({ buffer: file.data });
          return result.value;
        } else if (convertTo === 'pdf') {
          // Convert to PDF using pandoc
          const inputFilePath = 'input.' + file.name.split('.').pop();
          const outputFilePath = 'output.pdf';
    
          // Save the input file temporarily
          require('fs').writeFileSync(inputFilePath, file.data);
    
          // Execute pandoc command
          const pandocCommand = `pandoc ${inputFilePath} -o ${outputFilePath}`;
          exec(pandocCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error converting to PDF: ${stderr}`);
            } else {
              console.log(`Conversion successful. Output PDF: ${outputFilePath}`);
            }
    
            // Cleanup: Remove the temporary input file
            require('fs').unlinkSync(inputFilePath);
          });
    
          // Return the output file path or other relevant information
          return outputFilePath;
        } else {
          // Unsupported conversion type or file format
          throw new Error('Unsupported conversion type or file format.');
        }
      } catch (error) {
        console.error('Conversion error:', error);
        throw error;
      }
}

async function performCraft(file, craftType, convertTo = null) {
    try {
        return craftFunctions[craftType](file, convertTo);
    } catch (error) {
        console.error(error);
        throw new Error('Error during image processing');
    }
  }