import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import polygonsIntersect from 'polygons-intersect';

import { InfoModal } from 'components/molecules';
import { useInfo } from 'contexts/GlobalProvider';

import {
  StyledCanvas,
  CanvasContainer,
} from './TimeCanvas.style';

type TimeCanvasProps = {
  dimensions: number[],
  detections: ServerResponse[] | undefined,
  color?: string,
  addNotification: (url: string) => void,
  limitTime?: number,
};

function TimeCanvas({
  dimensions,
  detections,
  color = '#4BBFD1',
  addNotification,
  limitTime,
}: TimeCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<number[][]>([]);
  const [entities, setEntities] = useState<ServerResponse[]>([]);
  const [info, setInfo] = useInfo();

  const timeMarker = useRef<number>(0);
  const entityLabels = useRef<string[]>([]);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener('click', (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        setDots((prevDots: number[][]) => ([
          ...prevDots,
          [
            (e.clientX - rect.left) * scaleX,
            (e.clientY - rect.top) * scaleY,
          ],
        ]));
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
    if (detections && dots.length > 2) {
      const entitiesInside = detections.filter((detection) => {
        const detectionDots: number[] = JSON.parse(detection.bb_o);

        const dot1 = [detectionDots[0], detectionDots[1]];
        const dot2 = [detectionDots[0] + detectionDots[2], detectionDots[1]];
        const dot3 = [detectionDots[0] + detectionDots[2], detectionDots[1] + detectionDots[3]];
        const dot4 = [detectionDots[0], detectionDots[1] + detectionDots[3]];

        const detectionPolygon = [dot1, dot2, dot3, dot4];
        const detectionPolygonObj = detectionPolygon.map(([x, y]) => ({ x, y }));

        const intersectionPoints = polygonsIntersect(
          detectionPolygonObj,
          dots.map(([x, y]) => ({ x, y })),
        );

        return intersectionPoints.length > 0;
      });
      setEntities(entitiesInside);
    }
  }, [dots, JSON.stringify(detections)]);

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
    if (
      info.video
      && info.canvas
      && entities.length > 0
    ) {
      const resetCounter = () => {
        timeMarker.current = Date.now();
        entityLabels.current = entities.map(({ label }) => label);
      };

      if (timeMarker.current === 0) {
        resetCounter();
        return;
      }

      if (Date.now() - timeMarker.current >= 10000) {
        timeMarker.current = Date.now();
        entityLabels.current = entities.map(({ label }) => label);
        addNotification(drawImageOnVideoSync(document.createElement('canvas')));
      } else if (
        JSON.stringify(entities.map(({ label }) => label)) !== JSON.stringify(entityLabels.current)
      ) {
        resetCounter();
      }
    }
  }, [JSON.stringify(entities), limitTime, info]);

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
  label: 'person' | 'truck' | 'car' | 'bus';
}

export default TimeCanvas;
