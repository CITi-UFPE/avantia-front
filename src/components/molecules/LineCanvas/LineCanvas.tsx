import React, { useEffect, useRef, useState } from 'react';
import intersects from 'intersects';

import { InfoModal } from 'components/molecules';
import { useInfo } from 'contexts/GlobalProvider';

import {
  StyledCanvas,
  CanvasContainer,
  Warn,
} from './LineCanvas.style';

type LineCanvasProps = {
  dimensions: number[],
  detections: ServerResponse[] | undefined,
  threshold: number,
  color?: string,
};

function LineCanvas({
  dimensions,
  detections,
  color = '#4BBFD1',
}: LineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<number[][]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [, setInfo] = useInfo();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        setDots((prevDots: number[][]) => {
          const tempDots = [...prevDots];
          if (prevDots.length === 2) tempDots.pop();
          return ([
            ...tempDots,
            [
              (e.clientX - rect.left) * scaleX,
              (e.clientY - rect.top) * scaleY,
            ],
          ]);
        });
      });
    }
  }, [canvasRef]);

  useEffect(() => {
    window.addEventListener('keypress', (event) => {
      if (event.key === 'z' && event.ctrlKey) {
        event.preventDefault();
        setDots((prevDots) => {
          if (prevDots.length === 1) return [];
          const tempDots = [...prevDots];

          tempDots.pop();

          return tempDots;
        });
      }
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    dots.forEach((dot, i) => {
      ctx.beginPath();
      ctx.arc(dot[0], dot[1], 5, 0, Math.PI * 2);
      ctx.fill();

      if (i === 0) return;

      ctx.moveTo(dot[0], dot[1]);
      ctx.lineTo(dots[i - 1][0], dots[i - 1][1]);
      ctx.stroke();

      if (i !== dots.length - 1) return;

      ctx.moveTo(dot[0], dot[1]);
      ctx.lineTo(dots[0][0], dots[0][1]);
      ctx.stroke();
    });

    if (dots[0]) {
      ctx.fillStyle = `${color}33`;
      ctx.beginPath();
      ctx.moveTo(dots[0][0], dots[0][1]);
      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        ctx.lineTo(dot[0], dot[1]);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = color;
  }, [dots, color]);

  useEffect(() => {
    if (detections && dots.length > 1) {
      const entitiesInside = detections.filter((detection) => {
        const detectionDots: number[] = JSON.parse(detection.bb_o);

        const dot1 = [detectionDots[0], detectionDots[1]];
        const dot2 = [detectionDots[0] + detectionDots[2], detectionDots[1]];
        const dot3 = [detectionDots[0] + detectionDots[2], detectionDots[1] + detectionDots[3]];
        const dot4 = [detectionDots[0], detectionDots[1] + detectionDots[3]];

        const detectionPolygon = [...dot1, ...dot2, ...dot3, ...dot4];

        const intersect = intersects.linePolygon(
          dots[0][0],
          dots[0][1],
          dots[1][0],
          dots[1][1],
          detectionPolygon,
          0,
        );

        return intersect;
      });
      console.log(entitiesInside);

      setAmount(entitiesInside.length);
    }
  }, [detections, dots]);

  useEffect(() => {
    console.log(intersects.linePolygon(
      12,
      0,
      12,
      12,
      [0, 0, 0, 10, 10, 10, 10, 0],
      0,
    ));
  }, []);

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

  return (
    <CanvasContainer>
      {amount > 0 && <Warn>Cruzamento detectado!</Warn>}
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
  label: 'person' | 'truck' | 'car' | 'bus';
}

export default LineCanvas;
