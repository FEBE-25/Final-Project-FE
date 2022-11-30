import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/navbar.css";
import ProfileIcon from "../images/user-icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { userOut } from "../redux/action/userAction";

function Navbar() {
  const [isToggle, setToggle] = useState(true);
  const [toggleLogOut, setToggleLogOut] = useState(false);

  const { user, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(!isToggle);
  };

  const resetToggle = () => {
    setToggle(true);
  };

  const handleMouseOver = () => {
    setToggleLogOut(true);
  };

  const handleMouseOut = () => {
    setToggleLogOut(false);
  };

  const handleLogOut = () => {
    localStorage.setItem("logged_user", null);
    localStorage.setItem("isLoggedIn", false);
    dispatch(userOut());
  };

  return (
    <nav>
      <Link to="/">
        <p className="nav-logo">Ajarin</p>
      </Link>
      <ul className={isToggle ? "nav-menu" : "nav-menu active"}>
        <li>
          <Link to={isLogin ? "/teacher" : "/regis"} onClick={resetToggle}>
            Pesan Les
          </Link>
        </li>
        <li>
          <Link to={isLogin ? "/request" : "/regis"} onClick={resetToggle}>
            Daftar Pesanan
          </Link>
        </li>
        <li>
          <Link to={isLogin ? `/schedule/${user?.id}` : "/regis"}>
            Jadwal Les
          </Link>
        </li>
        <li>
          <Link className="history-les" to={`/history/${user?.id}`}>
            History Les
          </Link>
        </li>
        {isLogin ? (
          <li className="profile-img">
            <img
              src={ProfileIcon}
              alt="profile-icon"
              onMouseOver={handleMouseOver}
            />
            {toggleLogOut && (
              <p
                className="log-out"
                onMouseOut={handleMouseOut}
                onClick={handleLogOut}
              >
                Log Out
              </p>
            )}
          </li>
        ) : (
          <>
            <li>
              <Link to="/login" onClick={resetToggle}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/regis" onClick={resetToggle}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
      <div
        onClick={handleToggle}
        className={isToggle ? "hamburger" : "hamburger active"}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default Navbar;
