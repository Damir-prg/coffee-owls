import { useState, useEffect, useCallback, useMemo } from 'react';

/**
 * Возвращает отформатированную строку, представляющую оставшееся время в формате "ЧЧ:ММ:СС".
 *
 * @param {number} delay - Начальный задержка в секундах.
 * @param {() => void} [callback] - Необязательная функция обратного вызова, которая будет вызвана, когда время достигнет 0.
 * @return {string} - Отформатированное оставшееся время.
 */
export const useTimer = (delay: number, callback?: () => void) => {
  const [time, setTime] = useState(delay);

  const getHours = useCallback(
    (time: number): string =>
      Math.floor(time / 3600)
        .toString()
        .padStart(2, '0'),
    [],
  );

  const getMinutes = useCallback(
    (time: number): string =>
      Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, '0'),
    [],
  );

  const getSeconds = useCallback((time: number): string => (time % 60).toString().padStart(2, '0'), []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(time => time - 1);
    }, 1000);

    if (time === 0) {
      clearInterval(intervalId);
      callback?.();
    }

    return () => clearInterval(intervalId);
  }, [time, callback]);

  return useMemo(
    () => `${getHours(time)}:${getMinutes(time)}:${getSeconds(time)}`,
    [getHours, getMinutes, getSeconds, time],
  );
};
