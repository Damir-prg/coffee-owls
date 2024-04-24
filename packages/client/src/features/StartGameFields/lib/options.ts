import { CheckboxOptionType } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

export const changeGameModeOptions: CheckboxOptionType<CheckboxValueType>[] = [
  {
    label: 'На время',
    value: 'time-limit',
  },
  {
    label: 'В своё удовольствие',
    value: 'free-play',
  },
];
