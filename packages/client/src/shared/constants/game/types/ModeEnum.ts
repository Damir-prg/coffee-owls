export enum EGAME_MODE_VALUES {
  TIME_LIMIT = 'time-limit',
  FREE_PLAY = 'free-play',
}

export const gameModeTranslate: Record<EGAME_MODE_VALUES, string> = {
  [EGAME_MODE_VALUES.TIME_LIMIT]: 'На время',
  [EGAME_MODE_VALUES.FREE_PLAY]: 'В своё удовольствие',
};
