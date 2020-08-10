import { useState, useEffect } from 'react';

import padTime from 'helpers/padTime';

function useFormattedTime(deadline: string) {
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [countdownId, setCountdownId] = useState<number>(0);

  useEffect(() => {
    if (remainingTime && !countdownId) {
      setCountdownId(setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(countdownId);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000));
    }
  }, [remainingTime, countdownId]);

  useEffect(() => {
    if (deadline) setRemainingTime(new Date(deadline).getTime() - Date.now());
  }, [deadline]);

  if (!deadline || !countdownId) return '--:--';

  if (remainingTime <= 0) return '00:00';

  const remainingMinutes = Math.floor((remainingTime / (1000 * 60)));
  const remainingSeconds = (((remainingTime % (60 * 1000)) / 1000)).toFixed(0);

  return `${padTime(remainingMinutes)}:${padTime(remainingSeconds)}`;
}

export default useFormattedTime;
