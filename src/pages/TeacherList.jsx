import React, { useEffect, useState } from "react";
import "../styles/TeacherList.css";
import TeacherCard from "../components/TeacherCard";
// import axios from "axios";
// import teacherReducer from "../redux/reducer/teacherReducer";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../redux/action/teacherAction";

function TeacherList() {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const { teachers } = useSelector((state) => state.teachers);

  useEffect(() => {
    dispatch(getTeachers());
  }, []);

  const filterTeachers = teachers.filter((teacher) => {
    return teacher.nama.toLowerCase().includes(search);
    // ||
    // teacher.edukasi[0].lokasi.toLowerCase().includes(search) ||
    // teacher.edukasi[0].jurusan.toLowerCase().includes(search)
  });

  return (
    <>
      {/* <Navbar /> */}
      <div className="teacher-container">
        <h1 className="teacher-title">Daftar Pengajar</h1>
        <div className="search-teacher-wrapper">
          <label htmlFor="search-input" className="search-title">
            Search Pengajar
          </label>
          <input
            type="search"
            id="search-input"
            placeholder="nama/jurusan/lokasi"
            autoComplete="off"
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        {/* <div className="wrapper-list-teacher">
          {Object.keys(teachers).map((item, i) => {
            <div
              className="card-wrapper"
              key={i}
              onClick={() => {
                window.location.href = `/teachers/${i}`;
              }}
            >
              <div className="teacher-profile">
                <span>Gambar</span>
                <img
                  src={`https://drive.google.com/uc?export=view&id=${item.foto}`}
                  alt=""
                  className="profile-img"
                />
              </div>
              <div className="teacher-info">
                <h3 className="info-name">{tre[i]?.nama}</h3>
                <p className="info-university"></p>
                2a
                <p className="info-jurusan"></p>
              </div>
              <div className="teacher-rating">
                <div className="teacher-rating-rating">
                  ★ <span></span>
                </div>
                <div className="teacher-rating-review">10 ulasan</div>
              </div>
            </div>;
          })}
        </div> */}
        {/* <TeacherCard teachers={teachers} /> */}
        <TeacherCard teachers={search.length > 0 ? filterTeachers : teachers} />
      </div>
    </>
  );
}

export default TeacherList;
