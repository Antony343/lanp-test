export const getBase64 = (file) => new Promise((resolve, reject) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    // artificial trottling for resolve to present the loading animation
    setTimeout(() => resolve(reader.result), 1000)
  }
  reader.onerror = (error) => reject(error);
});