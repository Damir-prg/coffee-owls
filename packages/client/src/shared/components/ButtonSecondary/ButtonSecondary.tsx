import { Button, type ButtonProps } from 'antd';

import './ButtonSecondary.css';

export const ButtonSecondary = (props: ButtonProps) => {
  return <Button className="button__secondary" {...props} type="primary" />;
};
