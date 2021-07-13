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
})

export const validateImgFile = (file) => new Promise((resolve, reject) => {
  const fileType = file.type.split('/');

  !checkImgExt(fileType) ? reject(`The .${fileType[1]} files are not supported.`) : resolve(validateImg(file));
});

export const getBase64 = (file) => new Promise((resolve, reject) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // artificial trottling for resolve to present the loading animation
    setTimeout(() => resolve(reader.result), 1000)
  }
  reader.onerror = (error) => reject(error);
});