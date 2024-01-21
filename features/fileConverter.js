const sharp = require('sharp');
const mammoth = require('mammoth');
const { exec } = require('child_process');

const bodyParser = require('body-parser');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const docx = require('docx');

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

const { Document, Packer, Paragraph, TextRun } = docx;

async function documentConverter(file, convertTo) {
  try {
    if (!DocumentOptions.includes(convertTo)) {
      throw new Error('Invalid conversion option');
    }

    if (DocumentOptions.slice(0, 2).includes(convertTo) && file.mimetype === 'application/pdf') {
      const pdfBuffer = file.data;

      // Extract text from PDF using pdf-parse
      const pdfText = await pdfParse(pdfBuffer);

      // Convert PDF text to DOCX content
      const docContent = pdfText.text;

      // Create a DOCX document using docx library
      const convertedDoc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: docContent,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      // Pack the document and get the buffer
      const docBuffer = await Packer.toBuffer(convertedDoc);

      // Return the DOCX content
      return { content: docBuffer, type: 'docx', extension: 'docx' };

    } 
    // else if (convertTo === 'pdf' &&
    //   file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {

    //   const inputFilePath = 'input.' + file.name.split('.').pop();
    //   const outputFilePath = 'output.pdf';

    //   require('fs').writeFileSync(inputFilePath, file.data);

    //   const pandocCommand = `pandoc ${inputFilePath} -o ${outputFilePath}`;
    //   exec(pandocCommand, (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`Error converting to PDF: ${stderr}`);
    //     } else {
    //       console.log(`Conversion successful. Output PDF: ${outputFilePath}`);
    //     }

    //     require('fs').unlinkSync(inputFilePath);
    //   });

    //   // Return the converted content (not just the file name)
    //   // return require('fs').readFileSync(outputFilePath, 'utf-8');
    //   return outputFilePath;
    // } else {
    //   throw new Error('Unsupported conversion type or file format.');
    // }
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