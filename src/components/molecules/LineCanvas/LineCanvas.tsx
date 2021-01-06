import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
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
  addNotification?: (url: string) => void,
  clear: boolean,
  options: any,
};

function LineCanvas({
  dimensions,
  detections,
  color = '#4BBFD1',
  addNotification,
  clear,
  options,
}: LineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<number[][]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  const [info, setInfo] = useInfo();
  const dotGrabbed = useRef<number | null>(null);

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

        setDots((prevDots: number[][]) => {
          const tempDots = [...prevDots];
          const dot = [
            (e.clientX - rect.left) * scaleX,
            (e.clientY - rect.top) * scaleY,
          ];

          let isMouseOver = false;

          tempDots.forEach(([x, y]) => {
            if (
              Math.abs(dot[0] - x) < 10
              && Math.abs(dot[1] - y) < 10
            ) {
              isMouseOver = true;
            }
          });

          if (prevDots.length === 2) tempDots.pop();

          if (isMouseOver) return prevDots;

          return ([
            ...tempDots,
            dot,
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

        const width = detectionDots[2];
        const height = detectionDots[3];

        const radius = width > height ? width / 4 : height / 4;

        const intersect = intersects.circleLine(
          detectionDots[0] + width / 2,
          detectionDots[1] + height / 2,
          radius,
          dots[0][0],
          dots[0][1],
          dots[1][0],
          dots[1][1],
        );

        return intersect;
      });

      setAmount(entitiesInside.length);
    } else if (dots.length <= 1) {
      setAmount(0);
    }
  }, [detections, dots]);

  useEffect(() => {
    if (amount > 0) {
      if (addNotification) {
        addNotification(drawImageOnVideoSync(document.createElement('canvas')));
      }
    }
  }, [amount]);

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
    if (clear) setDots([]);
  }, [clear, options]);

  const watchCanvas = useCallback((event: any) => {
    const e = event as MouseEvent;
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      const dot = [
        (e.clientX - rect.left) * scaleX,
        (e.clientY - rect.top) * scaleY,
      ];

      let mouseOverIndex = -1;

      const isGrabbing = document.body.style.cursor === 'grabbing';

      if (isGrabbing) {
        setDots((prevDots: number[][]) => {
          const tempDots = [...prevDots];

          if (dotGrabbed.current !== null) {
            tempDots[dotGrabbed.current] = dot;
            return tempDots;
          }

          return prevDots;
        });
        return;
      }

      dots.forEach(([x, y], i) => {
        if (
          Math.abs(dot[0] - x) < 10
          && Math.abs(dot[1] - y) < 10
        ) mouseOverIndex = i;
      });

      document.body.style.cursor = mouseOverIndex !== -1 ? 'grab' : 'auto';

      if (mouseOverIndex !== -1 && mouseDown) {
        document.body.style.cursor = 'grabbing';
        dotGrabbed.current = mouseOverIndex;

        setDots((prevDots: number[][]) => {
          const tempDots = [...prevDots];

          tempDots[mouseOverIndex] = dot;

          return tempDots;
        });
      }
    }
  }, [canvasRef, dots, mouseDown]);

  const handleMouseDown = () => setMouseDown(true);

  const handleMouseUp = () => {
    setMouseDown(false);
    dotGrabbed.current = null;
    document.body.style.cursor = 'auto';
  };

  return (
    <CanvasContainer>
      {amount > 0 && <Warn>Cruzamento detectado!</Warn>}
      <StyledCanvas
        ref={canvasRef}
        width={dimensions[1]}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={watchCanvas}
        height={dimensions[0]}
      />
      <InfoModal actionText="Detecção de Cruzamento de Linha" />
    </CanvasContainer>
  );
}

export interface ServerResponse {
  'bb_o': string;
  prob: number;
  label: 'person' | 'truck' | 'car' | 'bus';
}

export default LineCanvas;
