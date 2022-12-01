import React, { useState } from "react";
import img from "../images/regisimg.png";
import { Link, useNavigate } from "react-router-dom";
import "../styles/regispage.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userIn } from "../redux/action/userAction";

const Regispage = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNoHp] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [jenjangpendidikan, setJenjang] = useState("SD");
  const [alamat, setAlamat] = useState("");
  const [asalsekolah, setSekolah] = useState("");


  const dispatch = useDispatch();

  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  const validate = () => {
    if (name == '' || email == '' || nohp == '' || password == '' || confirmPass == '' || jenjangpendidikan == '' || alamat == '' || asalsekolah == '') {
      alert("Data tidak valid")
    } else {
      if (password == confirmPass) {
        const dataRegis = { name, email, nohp, password, jenjangpendidikan, alamat, asalsekolah }
        axios.post('https://final-project-be-production-0be5.up.railway.app/user/register', dataRegis).then(res => {
          localStorage.setItem('logged_user', JSON.stringify(res.data))
          localStorage.setItem('isLoggedIn', true)
          dispatch(userIn(res.data))
          navigation('/')
        })
      } else {
        alert("Konfirmasi password berbeda")
      }
    }
  }

  return (
    <div className="regis-container">
      <div className="register__left">
        <img src={img} alt="" />
      </div>
      <div className="register__right">
        <div className="register__right-header">
          <h1>Buat Akun Baru</h1>
        </div>
        <div className="register__right-form">
          <form id="form" onSubmit={handleSubmit}>
            <div className="form__group">
              <label htmlFor="name">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Masukkan nama lengkap"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Masukkan email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="hp">Nomor Handphone</label>
              <input
                type="number"
                name="hp"
                id="hp"
                placeholder="Masukkan no. hp"
                value={nohp}
                onChange={e => setNoHp(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Masukkan password"
                value={password}
                onChange={e => setPass(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="confirmPassword">Konfirmasi Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Masukkan password ulang"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="education">Jenjang Pendidikan</label>
              <select name="education" id="education"
                value={jenjangpendidikan}
                onChange={(e) => { setJenjang(e.target.value) }}>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
              </select>
            </div>

            <div className="form__group">
              <label htmlFor="address">Alamat Lengkap</label>
              <input
                name="address"
                type="text"
                id="address"
                cols="30"
                rows="10"
                placeholder="Masukkan alamat lengkap"
                value={alamat}
                onChange={e => setAlamat(e.target.value)}
              />
            </div>

            <div className="form__group">
              <label htmlFor="school">Asal Sekolah</label>
              <input
                type="text"
                name="school"
                id="school"
                placeholder="Masukkan asal sekolah"
                value={asalsekolah}
                onChange={e => setSekolah(e.target.value)}
              />
            </div>

            <div className="form__group">
              <button
                type="submit"
                name="register"
                className="btn"
                id="btn-submit"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div className="register__right-footer">
          <p>
            Sudah mempunyai akun? <Link to="/login">Login</Link>
          </p>
        </div>
      </div >
    </div >
  );
};

export default Regispage;
