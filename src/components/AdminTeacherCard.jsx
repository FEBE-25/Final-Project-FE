import React from "react";
import EditIcon from "../images/edit-icon.svg";
import DeleteIcon from "../images/delete-icon.svg";
import "../styles/AdminTeacher.css";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const AdminTeacherCard = ({ data, navigation, dispatch, deleteTeacher }) => {
  return (
    <tbody>
      {data.map((teacher, index) => {
        return (
          <tr key={index}>
            <td>{teacher.nama}</td>
            <td>{teacher.email}</td>
            <td>{teacher.noHp}</td>
            <td className="action">
              <Link to={`/edit-teacher/${teacher.id}`} state={{ ...teacher }}>
                <img
                  src={EditIcon}
                  alt="edit-icon"
                  onClick={() => navigation(`/edit-teacher/${teacher.id}`)}
                />
              </Link>
              <img
                src={DeleteIcon}
                alt="delete-icon"
                onClick={() => {
                  dispatch(deleteTeacher(teacher.id));
                }}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default AdminTeacherCard;
