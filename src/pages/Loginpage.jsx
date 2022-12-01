import React, { useState, useEffect } from "react";
import img from "../images/regisimg.png";
import "../styles/loginpage.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userIn } from "../redux/action/userAction";

const Loginpage = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [listUser, setListUser] = useState({})
  const [data, setData] = useState({});

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ email, password });
    validate()
    setemail("")
    setPassword("")
  };

  useEffect(() => {
    axios.get("https://634a01375df95285140a732e.mockapi.io/users").then((res) => {
      setListUser(res.data)
    });
  }, []);

  const validate = () => {
    let searchRes = null;
    if (email != "" && password != "") {
      searchRes = listUser.filter(user => user.email == email && user.password == password)[0]
    }
    if (searchRes != null) {
      localStorage.setItem('logged_user', JSON.stringify(searchRes))
      localStorage.setItem('isLoggedIn', true)
      dispatch(userIn(searchRes))
      if (searchRes.admin) {
        navigation('/admin')
      } else
        navigation('/')
    } else {
      alert("password salah")
    }
  }

  return (
    <div className="login-container" id="login">
      <div className="login__left">
        <img src={img} alt="" />
      </div>

      <div className="login__right">
        <div className="login__right-header">
          <h1>Masuk</h1>
        </div>

        <div className="login__right-form">
          <form action="" id="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="user_email">Email</label>
              <input
                type="email"
                name="email"
                id="user_email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="user_password">Password</label>
              <input
                type="password"
                name="password"
                id="user_password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form__group">
              <button
                type="submit"
                name="register"
                className="btn"
                id="btn-login"
              >
                login
              </button>
            </div>
          </form>
        </div>

        <div className="register__right-footer">
          <p>
            Belum mempunyai akun? <Link to="/regis">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loginpage;
