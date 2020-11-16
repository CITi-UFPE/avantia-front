import React, { useEffect, useRef, useCallback } from 'react';

import { InfoModal } from 'components/molecules';
import { useInfo } from 'contexts/GlobalProvider';
import filterFilters from 'helpers/filterFilters';
import whiteLogo from 'assets/white-logo.png';

import {
  StyledCanvas,
  CanvasContainer,
} from './Canvas.style';

function Canvas({
  dimensions,
  filters,
  addNotification,
}: {
  dimensions: number[],
  filters: ServerResponse[],
  addNotification: (url: string) => void,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [info, setInfo] = useInfo();

  const drawImageOnVideoSync = useCallback((canvas: HTMLCanvasElement) => {
    const drawCanvas = canvas;

    drawCanvas.width = info.video.videoWidth;
    drawCanvas.height = info.video.videoHeight;

    const ctx = drawCanvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.translate(drawCanvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(info.video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.drawImage(info.canvas, 0, 0);

    const image = drawCanvas.toDataURL('image/png');
    return image;
  }, [info]);

  console.log(filters);

  useEffect(() => {
    const drawFilters = async () => {
      const canvas = canvasRef?.current;

      const labelRect = { width: 170, height: 30, padding: 15 };
      const imageSize = { width: 50, height: 10 };

      const ctx = canvas?.getContext('2d');

      if (ctx && canvas) {
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineWidth = 3;

        const filteredFilters = filterFilters(filters);

        // eslint-disable-next-line no-restricted-syntax
        for (const filter of filteredFilters) {
          const { bb_o: bbo, prob, label } = filter;
          const arrBbo: number[] = JSON.parse(bbo);
          const minifiedProb = Number((prob * 100).toFixed(0));

          // eslint-disable-next-line no-continue
          if (minifiedProb < 80) continue;

          const mainColor = label === 'mask' ? '#009A1D' : '#D50808';
          ctx.strokeStyle = mainColor;
          ctx.fillStyle = mainColor;

          ctx.beginPath();

          // Stroke
          ctx.rect(
            arrBbo[0] + 0.5,
            arrBbo[1] + 0.5,
            arrBbo[2],
            arrBbo[3],
          );

          const labelRectPos = {
            x: arrBbo[0] + arrBbo[2] - labelRect.width,
            y: arrBbo[1] - labelRect.height,
          };

          // Label Rectangle
          ctx.fillRect(
            labelRectPos.x,
            labelRectPos.y,
            labelRect.width + 2,
            labelRect.height,
          );

          // Image
          const image = new Image();
          image.src = whiteLogo;

          // eslint-disable-next-line no-await-in-loop
          await new Promise((res) => {
            image.onload = () => {
              ctx.drawImage(
                image,
                labelRectPos.x + labelRect.padding,
                labelRectPos.y + (labelRect.height / 2) - (imageSize.height / 2),
                imageSize.width,
                imageSize.height,
              );

              ctx.fillStyle = 'white';

              const displayText = label === 'mask' ? 'com máscara' : 'sem máscara';

              // Text
              ctx.fillText(
                `${displayText} ${minifiedProb}%`,
                labelRectPos.x + labelRect.padding * 2 + imageSize.width,
                labelRectPos.y + (labelRect.height / 2) + 3,
              );
              ctx.stroke();

              ctx.closePath();
              res();
            };
          });
        }
      }
    };

    drawFilters();
  }, [canvasRef, filters]);

  useEffect(() => {
    if (canvasRef.current) {
      setInfo((prevInfo: Object) => ({
        ...prevInfo,
        canvas: canvasRef.current,
      }));
    }
    return () => {
      setInfo((prevInfo: Object) => ({
        ...prevInfo,
        canvas: null,
      }));
    };
  }, [canvasRef, setInfo]);

  useEffect(() => {
    const filtersNoMask = filters.filter((filter) => {
      if (filter.label === 'nomask') {
        return true;
      }
      return false;
    });

    if (filtersNoMask.length > 0) {
      if (addNotification) {
        addNotification(drawImageOnVideoSync(document.createElement('canvas')));
      }
    }
  }, [JSON.stringify(filters)]);

  return (
    <CanvasContainer>
      <StyledCanvas
        ref={canvasRef}
        width={dimensions[1]}
        height={dimensions[0]}
      />
      <InfoModal />
    </CanvasContainer>
  );
}

export interface ServerResponse {
  'bb_o': string;
  prob: number;
  label: 'mask' | 'nomask';
}

export default Canvas;
