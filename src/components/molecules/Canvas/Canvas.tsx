import React, { useEffect, useRef } from 'react';

import { InfoModal } from 'components/molecules';
import whiteLogo from 'assets/white-logo.png';

import {
  StyledCanvas,
  CanvasContainer,
} from './Canvas.style';

function Canvas({ dimensions, filters }: { dimensions: number[], filters: ServerResponse[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef?.current;

    const labelRect = { width: 140, height: 30, padding: 15 };
    const imageSize = { width: 50, height: 10 };

    const ctx = canvas?.getContext('2d');

    if (ctx && canvas) {
      ctx.beginPath();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3;

      filters.forEach((filter) => {
        const { bb_o: bbo, prob, label } = filter;
        const arrBbo: number[] = JSON.parse(bbo);
        const minifiedProb = Number(prob.toFixed(2));

        if (minifiedProb < 0.7) return;

        const mainColor = label === 'mask' ? '#009A1D' : '#D50808';
        ctx.strokeStyle = mainColor;
        ctx.fillStyle = mainColor;

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

        image.onload = () => {
          ctx.drawImage(
            image,
            labelRectPos.x + labelRect.padding,
            labelRectPos.y + (labelRect.height / 2) - (imageSize.height / 2),
            imageSize.width,
            imageSize.height,
          );
        };

        ctx.fillStyle = 'white';

        // Text
        ctx.fillText(
          `${label} ${minifiedProb}`,
          labelRectPos.x + labelRect.padding * 2 + imageSize.width,
          labelRectPos.y + (labelRect.height / 2) + 3,
        );
      });
      ctx.stroke();
    }
  }, [canvasRef, filters]);

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
