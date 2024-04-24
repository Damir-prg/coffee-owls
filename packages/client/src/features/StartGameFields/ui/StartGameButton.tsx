import '../styles/StartGameButton.css';
import { Button } from 'antd';

export const StartGameButton = () => {
  return (
    <Button type="primary" size="large" className="game__start-button">
      НАЧАТЬ ИГРУ
    </Button>
  );
};
