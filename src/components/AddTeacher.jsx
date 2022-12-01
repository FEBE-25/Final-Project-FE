import React, { useState } from "react";
import "../styles/AddTeacher.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AddTeacher = () => {
  const { user } = useSelector((state) => state.user);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [noHp, setNoHp] = useState("");
  const [foto, setFoto] = useState("");
  const [edukasi, setEdukasi] = useState([
    { lokasi: "", jurusan: "" },
    { lokasi: "", jurusan: "" },
  ]);
  const [alamat, setAlamat] = useState({ "kabupaten kota": "", provinsi: "" });
  const [bidangAjar, setBidangAjar] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    validateTeacher();
    resetForm();
  };

  const validateTeacher = () => {
    const dataTeacher = {
      nama,
      email,
      noHp,
      foto,
      edukasi,
      alamat,
      "bidang ajar": bidangAjar,
    };
    axios
      .post("https://634a01375df95285140a732e.mockapi.io/teachers", dataTeacher)
      .then((res) => {
        console.log(res);
        localStorage.setItem("teacherData", JSON.stringify(res.data));
      });
  };

  const resetForm = () => {
    setNama("");
    setEmail("");
    setNoHp("");
    setFoto("");
    setEdukasi([{ lokasi: "", jurusan: "" }, { lokasi: "", jurusan: "" }]);
    setAlamat({ "kabupaten kota": "", provinsi: "" });
    setBidangAjar([]);
  };

  return (
    <>
      {user && user.admin ?

        <>
          <div className="add-teacher">
            <Link to='/admin' className='return'>Kembali ke Dashboard</Link>
            <div className="form-container">
              <h1 className="add-title">Menambahkan Teacher Baru</h1>
              <form className="form-wrapper" onSubmit={handleSubmit}>
                <div className="nama">
                  <label htmlFor="nama">Nama</label>
                  <input
                    type="text"
                    className="input-addteacher"
                    id="nama"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                <div className="email">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="input-addteacher"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan email"
                  />
                </div>

                <div className="noHp">
                  <label htmlFor="noHp">No. Hp</label>
                  <input
                    type="number"
                    className="input-addteacher"
                    id="noHp"
                    value={noHp}
                    onChange={(e) => setNoHp(e.target.value)}
                    placeholder="Masukkan no. hp"
                  />
                </div>

                <div className="foto">
                  <label htmlFor="foto">Foto</label>
                  <input
                    type="text"
                    className="input-addteacher"
                    id="foto"
                    value={foto}
                    onChange={(e) => setFoto(e.target.value)}
                  />
                </div>

                <div className="edu">
                  <label htmlFor="univ">Universitas</label>
                  <input
                    type="text"
                    className="input-addteacher"
                    id="univ"
                    placeholder="Lokasi"
                    value={edukasi[0].lokasi}
                    onChange={(e) =>
                      setEdukasi([
                        { ...edukasi[0], lokasi: e.target.value },
                        edukasi[1],
                      ])
                    }
                  />
                  <input
                    type="text"
                    className="input-addteacher"
                    id="univ"
                    placeholder="Jurusan"
                    value={edukasi[0].jurusan}
                    onChange={(e) =>
                      setEdukasi([
                        { ...edukasi[0], jurusan: e.target.value },
                        edukasi[1],
                      ])
                    }
                  />
                </div>

                <div className="edu">
                  <label htmlFor="sma">SMA</label>
                  <input
                    type="text"
                    className="input-addteacher"
                    id="sma"
                    placeholder="Lokasi"
                    value={edukasi[1].lokasi}
                    onChange={(e) =>
                      setEdukasi([
                        edukasi[0],
                        { ...edukasi[1], lokasi: e.target.value },
                      ])
                    }
                  />
                  <input
                    type="text"
                    className="input-addteacher"
                    id="sma"
                    placeholder="Jurusan"
                    value={edukasi[1].jurusan}
                    onChange={(e) =>
                      setEdukasi([
                        edukasi[0],
                        { ...edukasi[1], jurusan: e.target.value },
                      ])
                    }
                  />
                </div>

                <div className="alamat">
                  <label htmlFor="alamat">Alamat</label>
                  <input
                    type="text"
                    className="input-addteacher"
                    id="alamat"
                    placeholder="Kabupaten/Kota"
                    value={alamat["kabupaten kota"]}
                    onChange={(e) =>
                      setAlamat({ ...alamat, "kabupaten kota": e.target.value })
                    }
                  />
                  <input
                    type="text"
                    className="input-addteacher"
                    id="alamat"
                    placeholder="Provinsi"
                    value={alamat.provinsi}
                    onChange={(e) =>
                      setAlamat({ ...alamat, provinsi: e.target.value })
                    }
                  />
                </div>

                <div className="bidangAjar">
                  <label htmlFor="bidangAjar">Bidang Ajar</label>
                  <input
                    type="text"
                    className="input-addteacher"
                    id="bidangAjar"
                    value={bidangAjar}
                    onChange={(e) => setBidangAjar(e.target.value.split(", "))}
                    placeholder="Masukkan bidang ajar ex: Matematika, Fisika"
                  />
                </div>

                <div className="btn-add-wrapper">
                  <button type="submit" className="btn-addteacher">
                    Tambahkan Teacher
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>

        : <></>}
    </>
  );
};

export default AddTeacher;
