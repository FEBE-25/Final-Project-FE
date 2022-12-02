// import React, { useEffect, useState } from "react";
import "../styles/TeacherCard.css";
import Star from "../images/star.svg";

function TeacherCard({ data }) {
  return (
    <div className="wrapper-list-teacher">
      {data.map((item) => (
        <div
          className="card-wrapper"
          key={item.id}
          onClick={() => {
            window.location.href = `/teachers/${item.id}`;
          }}
        >
          <div className="teacher-profile">
            <img
              src={`https://drive.google.com/uc?export=view&id=${item.foto}`}
              alt=""
              className="profile-img"
            />
          </div>
          <div className="teacher-info">
            <h3 className="info-name">{item.nama}</h3>
            <p className="info-university">{item.edukasi[0].lokasi}</p>
            <p className="info-jurusan">{item.edukasi[0].jurusan}</p>
          </div>
          <div className="teacher-rating">
            <div className="teacher-rating-rating">
              <img src={Star} alt="" />
              <p>{item.overall.bintang}</p>
            </div>
            <div className="teacher-rating-review">10 ulasan</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TeacherCard;
