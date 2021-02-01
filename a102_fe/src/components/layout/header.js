import Navigation from "./navigation";
import { Link } from "react-router-dom";

function Header(){
      return (
      <div className="page-main-header">
          <div className="main-header">
              <div className="header-left">
                  <div className="logo-wrapper">
                      <Link to ="/">
                          <img src={"https://exhalepilateslondon.com/wp-content/uploads/2018/08/hello-logo-min.png"} alt="" />
                      </Link>
                  </div>
              </div>
              <div className="header-right col pull-right right-menu">
                  <ul className="nav-menus">
                    <Navigation />
                  </ul>
              </div>
          </div>
      </div>
      );
  };
  
export default Header;