import logo from "../../assets/logo.png";
import "./Header.css";
const Header = () => {
  return (
    <header className="header" onClick={() => window.scroll(0, 0)}>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
