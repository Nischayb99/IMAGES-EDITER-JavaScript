const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Correct input and output directories
const inputPath = 'C:\\Users\\c3175\\OneDrive\\Desktop\\Images Editing\\input';
const outputPath = 'C:\\Users\\c3175\\OneDrive\\Desktop\\Images Editing\\output';

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
}

// Debugging: Print paths to verify correctness
console.log('Input Path:', inputPath);
console.log('Output Path:', outputPath);

// Iterate over all files in the input directory
fs.readdir(inputPath, (err, files) => {
    if (err) {
        console.error('Could not list the directory.', err);
        process.exit(1);
    }

    files.forEach((file) => {
        const ext = path.extname(file).toLowerCase();
        if (ext === '.jpg' || ext === '.png') {
            // Construct the full file path
            const imgPath = path.join(inputPath, file);

            // Apply sharpen filter, convert to grayscale and enhance contrast
            sharp(imgPath)
                .sharpen()
                .grayscale()
                .modulate({ contrast: 1.5 })
                .toFile(path.join(outputPath, `${path.basename(file, ext)}_edited.jpg`), (err, info) => {
                    if (err) {
                        console.error('Error processing file', imgPath, err);
                    } else {
                        console.log('Processed file', imgPath);
                    }
                });
        }
    });
});
