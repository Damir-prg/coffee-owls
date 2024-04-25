import { GameLayout } from 'entities/GameLayout';
import { StartGame } from './StartGame';
import { GameContext } from 'entities/GameContext';

export const Game = () => {
  return (
    <GameContext>
      <GameLayout>
        <StartGame />
      </GameLayout>
    </GameContext>
  );
};
