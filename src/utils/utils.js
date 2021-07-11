const createImg = (result) => {
  let img = new Image();
  img.src = result;
  return img;
}

const validateImageRes = img => {
  if (img.height === 100 && img.width === 100) {
    return true
  }
  return false
}

export const validateFileType = (fileType) => {
  let isValid = (fileType[0] === 'image' && ['jpg', 'jpeg', 'png'].includes(fileType[1])) ? true : false;
  return isValid
}

export const getBase64 = (file) => new Promise(function (resolve, reject) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // creating new Image instance and checking the image resolution validity
    let img = createImg(reader.result);
    img.onload = function () {
      let isValid = validateImageRes(this);
      isValid ? resolve(reader.result) : reject('Inappropriate image size! Should be 100x100px.');
    }
  }
  reader.onerror = (error) => reject(error);
});