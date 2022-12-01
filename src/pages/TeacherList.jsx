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
    return (
      teacher.nama.toLowerCase().includes(search) ||
      teacher.edukasi[0].lokasi.toLowerCase().includes(search) ||
      teacher.edukasi[0].jurusan.toLowerCase().includes(search)
    );
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

        <TeacherCard data={search.length > 0 ? filterTeachers : teachers} />
      </div>
    </>
  );
}

export default TeacherList;
