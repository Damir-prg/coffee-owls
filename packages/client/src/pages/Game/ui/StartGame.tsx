import { GameContentContainer } from 'entities/GameContentContainer';
import { StartGameForm } from 'widgets/StartGameForm';

export const StartGame = () => {
  return (
    <GameContentContainer>
      <StartGameForm />
    </GameContentContainer>
  );
};
