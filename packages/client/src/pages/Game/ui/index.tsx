import { GameLayout } from 'entities/GameLayout';
import { StartGame } from './StartGame';
import { GameContextProvider } from 'entities/GameContext';

export const Game = () => {
  return (
    <GameContextProvider>
      <GameLayout>
        <StartGame />
      </GameLayout>
    </GameContextProvider>
  );
};
