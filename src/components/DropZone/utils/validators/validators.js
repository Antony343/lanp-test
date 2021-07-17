const checkImageSize = (img) => img.height === 100 && img.width === 100;

const imageExtensions = ['jpg', 'jpeg', 'png'];
const checkImgExt = (fileType) => (fileType[0] === 'image' && imageExtensions.includes(fileType[1]));

const validateImg = (file) => new Promise((resolve, reject) => {
  const fileURL = URL.createObjectURL(file);
  const img = new Image();
  img.src = fileURL;
  img.onload = () => {
    checkImageSize(img) ? resolve(file) : reject('Inappropriate image size!');
  }
});

export const validateImgFile = (file) => new Promise((resolve, reject) => {
  const fileType = file.type.split('/');

  !checkImgExt(fileType) ? reject(`The .${fileType[1]} files are not supported.`) : resolve(validateImg(file));
});

const checkOnPdfExt = fileType => fileType[0] === 'application' && fileType[1] === 'pdf';

export const validatePdfFile = file => new Promise((resolve, reject) => {
  const fileType = file.type.split('/');

  checkOnPdfExt(fileType) ? resolve(file) : reject('Unsupported file')
})