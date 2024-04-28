import { useCallback, useContext, useEffect } from 'react';
import { Flex, Typography, Radio, RadioChangeEvent } from 'antd';
import { EGAME_SCREEN_VALUES, changeGameModeOptions } from 'shared/constants/game';
import { GameContextInstance } from 'entities/GameContext';

const { Title } = Typography;

export const ChangeGameMode = () => {
  const { gameMode, setGameMode } = useContext(GameContextInstance);

  const handleChange = useCallback(
    (e: RadioChangeEvent) => {
      setGameMode(e.target.value);
    },
    [setGameMode],
  );

  useEffect(() => {
    console.log(`Выбранный режим игры: ${gameMode}`);
  }, [gameMode]);

  return (
    <Flex vertical align="center" justify="center" gap={16}>
      <Title level={5} className="title__primary text__center-align">
        Выберите режим игры:
      </Title>
      <Radio.Group
        onChange={handleChange}
        value={gameMode}
        buttonStyle="solid"
        options={changeGameModeOptions}
        optionType="button"
        defaultValue={EGAME_SCREEN_VALUES.START_GAME}
        className="zero-border-radius radio-gap"
      />
    </Flex>
  );
};
