import React, { useEffect, useState } from "react";
// import EditIcon from "../images/edit-icon.svg";
// import DeleteIcon from "../images/delete-icon.svg";
import AddIcon from "../images/add-icon.svg";
import "../styles/AdminTeacher.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers, deleteTeacher } from "../redux/action/teacherAction";
import { Link, useNavigate } from "react-router-dom";
import AdminTeacherCard from "../components/AdminTeacherCard";

const AdminTeacher = () => {
  const [search, setSearch] = useState("");
  useEffect(() => {
    dispatch(getTeachers());
    console.log(teachers);
  }, []);

  const dispatch = useDispatch();

  const { teachers } = useSelector((state) => state.teachers);

  const navigation = useNavigate();

  const filterTeachers = teachers.filter((teacher) => {
    return teacher.nama.toLowerCase().includes(search);
  });

  return (
    <div className="teacher-container admin">
      <div className="teacher-admin-header">
        <div className="search-teacher">
          <label htmlFor="cari-nama">Nama</label>
          <input
            type="text"
            className="search-input"
            id="cari-nama"
            placeholder="cari teacher"
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
          />
        </div>
        <div className="add-teacher">
          <button onClick={() => navigation("/add-teacher")}>
            <img src={AddIcon} alt="add-icon" />
            <p>Tambah Teacher Baru</p>
          </button>
        </div>
      </div>

      <table className="teacher-table">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>No HP</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <AdminTeacherCard
          data={filterTeachers.length > 0 ? filterTeachers : teachers}
          navigation={navigation}
          dispatch={dispatch}
          deleteTeacher={deleteTeacher}
        />
      </table>
    </div>
  );
};

export default AdminTeacher;
