import { useCallback, useEffect, useState } from 'react';
import { EGAME_MODE, ILeaderBoardGetResponse } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { leaderBoardApiGet } from 'shared/api/leaderBoardApi/leaderBoardApi';

export const useLeaderBoardData = (type: EGAME_MODE) => {
  const [data, setData] = useState<Array<ILeaderBoardGetResponse> | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    setPending(true);
    setError(null);
    const res = await leaderBoardApiGet(type);
    if (res) {
      setData(res);
    } else {
      setError('Не удалось загрузить рейтинг');
    }
    setPending(false);
  }, [type]);

  useEffect(() => {
    loadData();
  }, [type]);

  return [data, pending, error] as const;
};
