import './PageFooter.css';
import footerImg from '../../../images/footer-img.svg';

function PageFooter() {
  return (
    <>
      <img className="footer__img" src={footerImg} alt="Логотип команды"></img>
      <p className="footer__copy">&copy;Coffee Owls, {new Date().getFullYear()}</p>
    </>
  );
}

export default PageFooter;
