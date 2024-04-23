import React from 'react';
import { FC } from 'react';
import { Typography, Flex, Layout, Button, Image } from 'antd';
import { ESTUB_TYPE, STUB_ICON, STUB_TEXT } from 'shared/components/PageErrorStub/PageErrorStub.models';
import './PageErrorStub.css';
import { useNavigate } from 'react-router-dom';
import EROUTES from 'shared/RoutesEnum';

const { Content } = Layout;
const { Title } = Typography;

export const PageErrorStub: FC<{
  type: ESTUB_TYPE;
}> = ({ type }) => {
  const navigate = useNavigate();
  function handleBackButtonClick() {
    navigate(`/${EROUTES.HOME}`, {
      replace: true,
    });
  }

  const $infoBlock = (
    <Flex vertical align="center" gap={40}>
      <Title level={3} className="text__center-align text__pre-wrap">
        {STUB_TEXT[type]}
      </Title>
      <Button type="primary" size="large" onClick={handleBackButtonClick}>
        ВЕРНУТЬСЯ НА ГЛАВНУЮ СТРАНИЦУ
      </Button>
    </Flex>
  );

  return (
    <Content className="page-error-stub__content">
      <Flex vertical align="center" gap={132}>
        <Image height={440} width={660} src={STUB_ICON[type]} preview={false} alt="Иконка ошибки" />
        {$infoBlock}
      </Flex>
    </Content>
  );
};
