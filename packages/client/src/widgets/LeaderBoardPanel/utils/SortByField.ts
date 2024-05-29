import { ILeaderBoardResponse, TRatingFieldName } from 'shared/api/leaderBoardApi/leaderBoard.interface';
import { TSortDirection } from 'widgets/LeaderBoardPanel/types/LeaderBoardPanel.types';

export interface ISortByFieldParams {
  data: ReadonlyArray<ILeaderBoardResponse>;
  sortDirection: TSortDirection;
  ratingFieldName: TRatingFieldName;
}

export function SortByField({ data, sortDirection, ratingFieldName }: ISortByFieldParams): Array<ILeaderBoardResponse> {
  const length = data.length;
  if (!length) {
    return [];
  }

  const result = [...data];

  for (let i = 1; i < length; i++) {
    const currentIValue: number =
      ratingFieldName === 'score'
        ? result[i].data[ratingFieldName]
        : Number(result[i].data[ratingFieldName].split(':')[0]);

    /**
     * Находим индекс, на который нужно переместить значение
     * */
    const insertionIndex: number = (() => {
      for (let j = i - 1; j >= 0; j--) {
        /**
         * TODO
         * Так как пока не понятно, в каком формате будет приходить время, то сделала сортировку по минутам
         * */
        const currentJValue: number =
          ratingFieldName === 'score'
            ? result[j].data[ratingFieldName]
            : Number(result[j].data[ratingFieldName].split(':')[0]);

        const condition = sortDirection === 'DESC' ? currentJValue > currentIValue : currentJValue < currentIValue;
        if (condition) {
          return j + 1;
        }
      }
      return 0;
    })();

    const value = result[i];
    for (let k = i - 1; k >= insertionIndex; k--) {
      result[k + 1] = result[k];
    }

    result[insertionIndex] = value;
  }

  console.log(result);
  return result;
}
