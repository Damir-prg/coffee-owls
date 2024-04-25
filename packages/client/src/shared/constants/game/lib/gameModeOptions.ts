import { CheckboxOptionType } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { EGAME_MODE_VALUES } from '../types/ModeEnum';

export const changeGameModeOptions: CheckboxOptionType<CheckboxValueType>[] = [
  {
    label: 'На время',
    value: EGAME_MODE_VALUES.TIME_LIMIT,
  },
  {
    label: 'В своё удовольствие',
    value: EGAME_MODE_VALUES.FREE_PLAY,
  },
];
