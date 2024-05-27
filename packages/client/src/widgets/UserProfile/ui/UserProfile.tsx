import { FC } from 'react';
import { List, Typography } from 'antd';
import '../styles/UserProfile.css';
import { InfoListItems, TInfoListKey } from 'widgets/UserProfile/model/UserProfile.model';
import { useSelector } from 'react-redux';
import { TRootState } from 'shared/store/store';

const { Title, Text } = Typography;
export const UserProfile: FC = () => {
  const user = useSelector((state: TRootState) => state.user.userData);
  if (!user) {
    return null;
  }

  const keys = Object.keys(InfoListItems) as ReadonlyArray<TInfoListKey>;
  return (
    <List size="large" className="full-width" split={false}>
      {keys.map((key, index) => {
        return (
          <List.Item key={index}>
            <Title level={3} className="title__primary title_content">
              {InfoListItems[key]}
            </Title>
            <Text>{user[key]}</Text>
          </List.Item>
        );
      })}
    </List>
  );
};
