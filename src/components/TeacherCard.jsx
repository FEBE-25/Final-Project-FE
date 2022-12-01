// import React, { useEffect, useState } from "react";
import "../styles/TeacherCard.css";

function TeacherCard({ teachers }) {
  const data = teachers;
  return (
    <div className="wrapper-list-teacher">
      {data.map((item) => (
        <div
          className="card-wrapper"
          key={item._id}
          onClick={() => {
            window.location.href = `/teachers/${item._id}`;
          }}
        >
          <div className="teacher-profile">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt=""
              className="profile-img"
            />
          </div>
          <div className="teacher-info">
            <h3 className="info-name">{item.nama}</h3>
            <p className="info-university">Universitas Bumigora</p>
            <p className="info-jurusan">Ilmu Komputer</p>
          </div>
          <div className="teacher-rating">
            <div className="teacher-rating-rating">
              ★ <span>4.5</span>
            </div>
            <div className="teacher-rating-review">10 ulasan</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeacherCard;
