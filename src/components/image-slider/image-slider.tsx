import React, { useEffect, useState, useRef } from 'react';
import { ICanvasSize, ImageSliderProps } from './types';
import { draw, scaleToFit } from './utils';


export const ImageSlider: React.FC<ImageSliderProps> = ({ images, height = 150, width = 300 }) => {
  const canvasRef = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const canvasSize : ICanvasSize = { height, width };


  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    draw(context, images, canvasSize);
  }, []);

  const handleMouseDown = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  const handleMouseUp = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleMouseMove = (e: React.DragEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const context = canvasRef.current.getContext('2d');
    if (!isDragging || context === null) return;

    const offset = canvasRef.current.getBoundingClientRect();
    const recentX = e.clientX - offset.left;

    context.clearRect(0, 0, canvasSize.width, canvasSize.height);    // clear board

    let renderOffset = 0;
    let prevDx = 0;
    let prevDWidth = 0;

    images.forEach((url: string, index: number) => {

      const image = new Image();
      image.src = url;
      image.onload = () => {
        const [dx, dy, dWidth, dHeight] =
            scaleToFit(context, { width: image.width, height: image.height }, canvasSize);

        let drawX = recentX;
        drawX += renderOffset;

        context.drawImage(image, drawX, dy, dWidth, dHeight);

        renderOffset += (++index * Math.max(prevDx, dx)) + Math.max(prevDWidth, dWidth);
        prevDx = dx;
        prevDWidth = dWidth;
      }
    });
  };

  return (
    <section className="mx-auto mt-12 flex flex-col gap-2">
      <div className="border border-gray-200 bg-gray-200">
        <canvas
            className={isDragging ? 'cursor-grabbing' : 'cursor-grab'}
            id="image_slider"
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            {...canvasSize}
        />
      </div>
      <aside className='text-xs text-gray-500 text-center'>Drag to change image</aside>
    </section>
  );
};
