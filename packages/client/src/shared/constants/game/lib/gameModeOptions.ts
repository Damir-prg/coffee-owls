import { CheckboxOptionType } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { EGAME_MODE_VALUES, gameModeTranslate } from '../types/ModeEnum';

export const changeGameModeOptions: CheckboxOptionType<CheckboxValueType>[] = [
  {
    label: gameModeTranslate[EGAME_MODE_VALUES.TIME_LIMIT],
    value: EGAME_MODE_VALUES.TIME_LIMIT,
  },
  {
    label: gameModeTranslate[EGAME_MODE_VALUES.FREE_PLAY],
    value: EGAME_MODE_VALUES.FREE_PLAY,
  },
];
