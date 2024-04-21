import './PageFooter.css';
import footerImg from 'images/footer-img.svg';
import { Typography, Image } from 'antd';

function PageFooter() {
  const { Text } = Typography;

  return (
    <>
      <Image width={64} src={footerImg} preview={false} alt="Логотип команды"></Image>
      <Text className="footer__copy" strong>
        &copy;Coffee Owls, {new Date().getFullYear()}
      </Text>
    </>
  );
}

export default PageFooter;
