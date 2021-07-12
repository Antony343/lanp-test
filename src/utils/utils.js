const createImg = (result) => {
  let img = new Image();
  img.src = result;
  return img;
};

const validateImageRes = img => {
  if (img.height === 100 && img.width === 100) {
    return true
  }
  return false
};

const validateFileType = (fileType) => {
  let isValid = (fileType[0] === 'image' && ['jpg', 'jpeg', 'png'].includes(fileType[1])) ? true : false;
  return isValid
};

export const validateFile = (file) => new Promise((resolve, reject) => {
  const fileType = file.type.split('/');
  const fileURL = URL.createObjectURL(file);

  if (!validateFileType(fileType)) {
    reject(`The file extension .${fileType[1]} is not supported.`);
  }
  
  const img = createImg(fileURL);
  
  img.onload = () => {
    if (validateImageRes(img)) {
      resolve(file);
    } else {
      reject('Inappropriate image size! Should be 100x100px.');
    }
  }
});

export const getBase64 = (file) => new Promise(function (resolve, reject) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // artificial trottling for resolve to present the loading animation
    setTimeout(() => resolve(reader.result), 1000)
  }
  reader.onerror = (error) => reject(error);
});