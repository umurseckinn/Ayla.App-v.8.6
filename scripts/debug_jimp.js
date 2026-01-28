const Jimp = require('jimp');
console.log('Jimp export type:', typeof Jimp);
console.log('Jimp keys:', Object.keys(Jimp));

if (typeof Jimp.read === 'function') {
    console.log('Jimp.read exists');
} else {
    console.log('Jimp.read MISSING');
}
