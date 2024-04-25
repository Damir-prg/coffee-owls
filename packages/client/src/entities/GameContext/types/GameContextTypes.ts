import { EGAME_MODE_VALUES } from 'shared/constants/game';
import { EGAME_SCREEN_VALUES } from 'shared/constants/game/types/ScreensEnum';

export type TGameContext = {
  gameMode: EGAME_MODE_VALUES;
  setGameMode: (mode: EGAME_MODE_VALUES) => void;
  gameScreen: EGAME_SCREEN_VALUES;
  setGameScreen: (screen: EGAME_SCREEN_VALUES) => void;
};

export type TGameContextConsumer = { children: (value: TGameContext | null) => React.ReactNode };
