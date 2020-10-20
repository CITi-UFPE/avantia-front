import React, { useEffect, useRef, useState } from 'react';
import polygonsIntersect from 'polygons-intersect';

import { InfoModal } from 'components/molecules';
import { useInfo } from 'contexts/GlobalProvider';

import {
  StyledCanvas,
  CanvasContainer,
  InfoText,
} from './CrowdingCanvas.style';

function Canvas({
  dimensions,
  detections,
}: {
  dimensions: number[],
  detections: ServerResponse[] | undefined,
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dots, setDots] = useState<number[][]>([]);
  const [, setInfo] = useInfo();

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
      ctx.fillStyle = '#01020333';
      ctx.beginPath();
      ctx.moveTo(dots[0][0], dots[0][1]);
      for (let i = 0; i < dots.length; i += 1) {
        const dot = dots[i];
        ctx.lineTo(dot[0], dot[1]);
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.fillStyle = '#000';
  }, [dots]);

  useEffect(() => {
    if (detections && dots.length > 2) {
      const people = detections.filter(({ label }) => label === 'person');

      const peopleInside = people.filter((person) => {
        const detectionDots: number[] = JSON.parse(person.bb_o);

        const dot1 = [detectionDots[0], detectionDots[1]];
        const dot2 = [detectionDots[0] + detectionDots[2], detectionDots[1]];
        const dot3 = [detectionDots[0] + detectionDots[2], detectionDots[1] + detectionDots[3]];
        const dot4 = [detectionDots[0], detectionDots[1] + detectionDots[3]];

        const personPolygon = [dot1, dot2, dot3, dot4];
        const personPolygonObj = personPolygon.map(([x, y]) => ({ x, y }));

        const intersectionPoints = polygonsIntersect(
          personPolygonObj,
          dots.map(([x, y]) => ({ x, y })),
        );

        return intersectionPoints.length > 0;
      });

      console.log(peopleInside.length);

      const canvas = canvasRef.current;

      if (!canvas) return;

      const ctx = canvas.getContext('2d');

      if (!ctx) return;

      ctx.font = '30px Arial';

      ctx.clearRect(0, 0, 30, 30);

      ctx.fillText(peopleInside.length.toString(), 30, 30);
    }
  }, [detections, dots]);

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
      <StyledCanvas
        ref={canvasRef}
        width={dimensions[1]}
        height={dimensions[0]}
      />
      <InfoModal />
      <InfoText>
        Esta versão é apenas uma demonstração. Seus dados estão sendo protegidos
        de acordo com as normas da Lei Geral de Proteção de Dados (LGPD)
      </InfoText>
    </CanvasContainer>
  );
}

export interface ServerResponse {
  'bb_o': string;
  prob: number;
  label: 'person' | 'truck' | 'car' | 'bus';
}

export default Canvas;
