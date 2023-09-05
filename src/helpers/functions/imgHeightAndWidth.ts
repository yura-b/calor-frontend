/* eslint-disable @typescript-eslint/ban-ts-comment */

export const imageWidthAndHeight = (provideFile):Promise<{width: number | null, height: number | null}> => {
  // take the given file (which should be an image) and return the width and height
  const imgDimensions = { width: null, height: null };

  return new Promise(resolve => {
    const reader = new FileReader();

    reader.readAsDataURL(provideFile);
    reader.onload = function () {
      const img = new Image();
      // @ts-ignore
      img.src = reader.result;

      img.onload = function () {
        // @ts-ignore
        imgDimensions.width = img.width;
        // @ts-ignore
        imgDimensions.height = img.height;

        resolve(imgDimensions);
      }
    };
  });
}