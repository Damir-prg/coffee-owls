import { Button, type ButtonProps } from 'antd';

import './ButtonSecondary.css';

export const ButtonSecondary = (props: ButtonProps) => {
  return <Button type="primary" className="button__secondary" {...props} />;
};
