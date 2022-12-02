import React, { useEffect, useState } from "react";
import TeacherImg from "../images/teacher-sample.png";
import Star from "../images/star.svg";
import "../styles/teacher-details.css";
import { useParams, useNavigate } from "react-router";
import { getTeachers } from "../redux/action/teacherAction";
import { useDispatch, useSelector } from "react-redux";
import teacherReducer from "../redux/reducer/teacherReducer";
import { Link } from "react-router-dom";
import { chooseTeacher } from "../redux/action/orderAction";

const TeacherDetails = () => {

  const [isBio, setIsBio] = useState(true);
  const [isExp, setIsExp] = useState(false);
  const [isReview, setIsReview] = useState(false);

  const handleBio = () => {
    setIsBio(true);
    setIsExp(false);
    setIsReview(false);
  }

  const handleExp = () => {
    setIsBio(false);
    setIsExp(true);
    setIsReview(false);
  }

  const handleReview = () => {
    setIsBio(false);
    setIsExp(false);
    setIsReview(true);
  }

  const handleBintang = (jumlah) => {
    const elements = []
    for (let i = 0; i < jumlah; i++) {
      elements.push(i)
    }
    return elements
  }

  const dispatch = useDispatch();

  const { teachers } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  const params = useParams();
  const navigation = useNavigate()

  const handleChoose = (teacher) => {
    // console.log(teacher)
    dispatch(chooseTeacher(teacher))
    navigation('/order-form')
    // console.log(order.teacher)
  }

  const handleSumBintang = (reviews) => {
    let sum = 0
    reviews.forEach((review) => {
      sum += Number(review.bintang)
    })
    let avg = sum / reviews.length
    return avg.toFixed(2)
  }


  return (
    <>
      {teachers.map((teacher) => {
        if (teacher.id == params.id) {
          return (
            <section id="teacher-details" key={teacher.id}>
              <section id="teacher-header" className="teacher-header">
                <div className="header-info">
                  <img
                    src={`https://drive.google.com/uc?export=view&id=${teacher.foto}`}
                    alt=""
                    className="teacher-img"
                  />
                  <div className="header-text">
                    <p className="name">{teacher.nama}</p>
                    <p className="jurusan">
                      {teacher.edukasi[0].jurusan} | {teacher.edukasi[0].lokasi}
                    </p>
                    <p className="alamat">
                      {teacher.alamat["kabupaten kota"]} |{" "}
                      {teacher.alamat.provinsi}
                    </p>
                  </div>
                </div>
                <div className="header-btn">
                  <button id="submit" onClick={() => handleChoose(teacher)}>Belajar dengan {teacher.nama}</button>
                  <Link to='/teacher'>Lihat Pengajar Lain</Link>
                </div>
              </section>
              <section className="teacher-main">
                <div className="sub-navbar">
                  <ul className="sub-navbar-menu">
                    <li id="nav-profil" onClick={handleBio} className={isBio ? "navbar-menu" : "navbar-menu hidden"} >Profil Diri</li>
                    <li id="nav-pengalaman" onClick={handleExp} className={isExp ? "navbar-menu" : "navbar-menu hidden"}>Pengalaman</li>
                    <li id="nav-ulasan" onClick={handleReview} className={isReview ? "navbar-menu" : "navbar-menu hidden"} > Ulasan</li>
                  </ul>
                </div>

                <section id="teacher-details">
                  <div id="profil-diri" className={isBio ? "sub-menu" : "sub-menu hidden"}>
                    <div className="deskripsi-diri">
                      <h2>Deskripsi Diri</h2>
                      <p>
                        {teacher.deskripsi}
                      </p>
                    </div>

                    <div className="profil-diri-bawah">
                      <div className="edukasi">
                        <h2>Edukasi</h2>

                        {teacher.edukasi.map((edu, index) => (
                          <div className="edukasi-container" key={index}>
                            <p>{edu.lokasi}</p>
                            <p>{edu.jurusan}</p>
                          </div>
                        ))}
                      </div>

                      <div className="bidang-ajar">
                        <h2>Bidang Ajar</h2>
                        <ul id="bidang-ajar">
                          {teacher['bidang ajar'].map((bidang, index) => (
                            <li key={index}>{bidang}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div id="pengalaman" className={isExp ? "sub-menu" : "sub-menu hidden"}>
                    <h2>Daftar Pengalaman</h2>

                    {teacher.pengalaman.map((pengalaman, index) => (
                      <div className="pengalaman-detail" key={index}>
                        <p className="posisi">{pengalaman.posisi}</p>
                        <div className="pengalaman-status">
                          <p className="lokasi">{pengalaman.lokasi}</p>
                          <p className="mulai">{pengalaman.mulai} |</p>
                          <p className="selesai">{pengalaman.selesai}</p>
                        </div>
                        <p className="deskripsi">
                          {pengalaman.deskripsi}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div id="ulasan" className={isReview ? "sub-menu" : "sub-menu hidden"}>
                    <div id="rating-container" className="rating-pengajar">
                      <h2>Rating Pengajar</h2>

                      {teacher.review.map((review, index) => (
                        <div className="detail-rating" key={index}>
                          <div className="bintang">
                            {handleBintang(review.bintang).map((index) => (
                              <img src={Star} alt="" key={index} />
                            ))}
                          </div>
                          <p className="nama">{review.nama}</p>
                          <p className="deskripsi">{review.deskripsi}</p>
                        </div>
                      ))}
                    </div>
                    <div className="overall-rating">
                      <h2>Overall Rating</h2>
                      <div className="rating">
                        <img src={Star} alt="bintang" />
                        <h2>{handleSumBintang(teacher.review)}</h2>
                      </div>
                      <p className="jumlah-ulasan">{teacher.review.length} ulasan</p>
                    </div>
                  </div>
                </section>
              </section>
            </section>
          );
        }
      })}
    </>
  );
};

export default TeacherDetails;

/**
 * <section id="teacher-details">
      <section id="teacher-header" className="teacher-header">
        <div className="header-info">
          <img src={TeacherImg} alt="" classNameName="teacher-img" />
          <div className="header-text">
            <p className="name">Juliana Cameron</p>
            <p className="jurusan">Ilmu Komputer | Universitas Gadjah Mada</p>
            <p className="alamat">Sleman, DI Yogyakarta</p>
          </div>
        </div>
        <div className="header-btn">
          <button id="submit">Belajar dengan Albertus</button>
          <a>Lihat Pengajar Lain</a>
        </div>
      </section>
      <section className="teacher-main">
        <div className="sub-navbar">
          <ul className="sub-navbar-menu">
            <li id="nav-profil" className="navbar-menu">
              Profil Diri
            </li>
            <li id="nav-pengalaman" className="navbar-menu hidden">
              Pengalaman
            </li>
            <li id="nav-ulasan" className="navbar-menu hidden">
              Ulasan
            </li>
          </ul>
        </div>

        <section id="teacher-details">
          <div id="profil-diri" className="sub-menu hidden">
            <div className="deskripsi-diri">
              <h2>Deskripsi Diri</h2>
              <p>
                Hai semuanya, aku adalah seorang mahasiswa matematika yang
                sangat tertarik pada dunia belajar mengajar. Aku memiliki
                pengalaman mengajar selama 6 bulan sebagai pengajar freelance
                dan sering mengikuti berbagai pelatihan softskill
              </p>
            </div>
            <div className="profil-diri-bawah">
              <div className="edukasi">
                <h2>Edukasi</h2>
                <div className="edukasi-univ">
                  <p>Universitas Gadjah Mada</p>
                  <p>Ilmu Komputer</p>
                </div>
                <div className="edukasi-menengah">
                  <p>SMA Negeri 1 Klaten</p>
                  <p>Jurusan IPA</p>
                </div>
              </div>
              <div className="bidang-ajar">
                <h2>Bidang Ajar</h2>
                <ul id="bidang-ajar">
                  <li>Matematika</li>
                  <li>Statistika</li>
                  <li>Kimia</li>
                </ul>
              </div>
            </div>
          </div>

          <div id="pengalaman" className="sub-menu hidden">
            <h2>Daftar Pengalaman</h2>
            <div className="pengalaman-detail">
              <p class="posisi">Freelance Mengajar</p>
              <div class="pengalaman-status">
                <p class="lokasi">Independen |</p>
                <p class="mulai">Juli 2021 |</p>
                <p class="selesai">Sekarang</p>
              </div>
              <p class="deskripsi">
                Saya telah menjadi freelance untuk mengajar anak SD hingga SMA
                pada mata pelajaran matematika selama 1 tahun terakhir
              </p>
            </div>

            <div className="pengalaman-detail">
              <p class="posisi">Freelance Mengajar</p>
              <div class="pengalaman-status">
                <p class="lokasi">Independen |</p>
                <p class="mulai">Juli 2021 |</p>
                <p class="selesai">Sekarang</p>
              </div>
              <p class="deskripsi">
                Saya telah menjadi freelance untuk mengajar anak SD hingga SMA
                pada mata pelajaran matematika selama 1 tahun terakhir
              </p>
            </div>
          </div>

          <div id="ulasan" className="sub-menu">
            <div id="rating-container" className="rating-pengajar">
              <h2>Rating Pengajar</h2>
              <div className="detail-rating">
                <div className="bintang">
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                </div>
                <p className="nama">Albertus Handy</p>
                <p className="deskripsi">
                  Kakaknya sangat sabar dan cara kakaknya ngajar ngga bikin aku
                  bosen
                </p>
              </div>
              <div className="detail-rating">
                <div className="bintang">
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                  <img src={Star} alt="" />
                </div>
                <p className="nama">Albertus Handy</p>
                <p className="deskripsi">
                  Kakaknya sangat sabar dan cara kakaknya ngajar ngga bikin aku
                  bosen
                </p>
              </div>
            </div>
            <div className="overall-rating">
              <h2>Overall Rating</h2>
              <div className="rating">
                <img src={Star} alt="bintang" />
                <h2>4,70</h2>
              </div>
              <p className="jumlah-ulasan">10 ulasan</p>
            </div>
          </div>
        </section>
      </section>
    </section>
 */
