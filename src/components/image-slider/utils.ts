import { ICanvasSize } from './types';


export const scaleToFit = (ctx: CanvasRenderingContext2D, imgSize: ICanvasSize, size: ICanvasSize) => {
  const scale = Math.min(size.width / imgSize.width, size.height / imgSize.height);
  const dx = (size.width / 2) - (imgSize.width / 2) * scale;
  const dy = (size.height / 2) - (imgSize.height / 2) * scale;
  const dWidth = imgSize.width * scale;
  const dHeight = imgSize.height * scale;

  return [Math.round(dx), Math.round(dy), Math.round(dWidth), Math.round(dHeight)];
}

export const draw = (context: CanvasRenderingContext2D | null, images: string[], canvasSize: ICanvasSize) => {
  if (context !== undefined) {

    let renderOffset = 0;

    images.forEach((url, index) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        if (context !== null) {

          const imageSize = { height: image.height, width: image.width };
          const [dx, dy, dWidth, dHeight] = scaleToFit(context, imageSize, canvasSize);

          context.drawImage(image, dx + renderOffset, dy, dWidth, dHeight);

          renderOffset = canvasSize.width * (index + 1);
        }
      };
    });
  }
};
