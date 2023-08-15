import mergeImages from 'merge-images';

export const mergeImages = (images) => {
    mergeImages(images).then((b64) => {
        console.log(b64);
    }).catch((e) => {
        console.log(e)
    });
}