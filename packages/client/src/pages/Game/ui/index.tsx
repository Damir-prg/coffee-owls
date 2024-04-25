import { GameLayout } from 'entities/GameLayout';
import { ScreenSwitcher } from './ScreenSwitcher';
import { GameContextProvider } from 'entities/GameContext';

export const Game = () => {
  return (
    <GameContextProvider>
      <GameLayout>
        <ScreenSwitcher />
      </GameLayout>
    </GameContextProvider>
  );
};
