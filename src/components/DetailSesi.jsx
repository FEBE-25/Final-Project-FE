import React from "react";
import "../styles/Schedule.css";

const DetailSesi = ({ schedules, teachers, userId, handleDetailsRemove }) => {
  return (
    <div>
      {/* {schedules.filter((item) => {
        if (handleDetailsRemove === item.id) {
          return ( */}
      <div className="detail-sesi-wrapper" id="modal-detail">
        <div className="header">
          <h3 className="detail-title">Detail Sesi</h3>
          <button className="btn-close-schedule" onClick={handleDetailsRemove}>
            x
          </button>
        </div>
        <hr />
        <div className="detail-info">
          <div className="detail-top">
            <p>
              Pelajaran :{" "}
              <span>
                {schedules.map((item) => {
                  if (handleDetailsRemove === userId) {
                    return item.topik;
                  }
                })}
              </span>
            </p>
            <p>
              Pertemuan : <span>1</span>
            </p>
            <p>
              Pengajar : <span> </span>
              <span>asdsadasd</span>
            </p>
            <p>
              Hari/Tanggal : <span>asdsadasd</span>
            </p>
            <p>
              Waktu : <span> - selesai</span>
            </p>
          </div>
          <div className="detail-bottom">
            <h3>Detail Pembelajaran : </h3>
            <p>1. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p>2. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
            <p>3. Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </div>
          <button className="btn-detail-sesi" style={{ marginTop: "20px" }}>
            Online Via Zoom
          </button>
        </div>
      </div>
      {/* );
        }
      })} */}
    </div>
  );
};

export default DetailSesi;
