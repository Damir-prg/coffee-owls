import { Flex, Typography, Radio, RadioChangeEvent } from 'antd';
import { changeGameModeOptions } from '../lib/options';
import { useCallback } from 'react';

const { Title } = Typography;

export const ChangeGameMode = () => {
  const handleChange = useCallback((e: RadioChangeEvent) => {
    // TODO: Добавить change mode на контекст игры
    console.log(`Radio checked:${e.target.value}`);
  }, []);

  return (
    <Flex vertical align="center" justify="center" gap={16}>
      <Title level={5} className="title__primary text__center-align">
        Выберите режим игры:
      </Title>
      <Radio.Group
        onChange={handleChange}
        buttonStyle="solid"
        options={changeGameModeOptions}
        optionType="button"
        defaultValue={'free-play'}
        className="zero-border-radius radio-gap"
      />
    </Flex>
  );
};
