import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../styles/HistoryLes.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../redux/action/teacherAction";
import { getDataOrder } from "../redux/action/scheduleAction";

const HistoryLes = () => {
  const { teachers } = useSelector((state) => state.teachers);
  const { schedules } = useSelector((state) => state.schedules);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTeachers());
    dispatch(getDataOrder());
  }, []);

  const userId = useParams();
  const user = userId.id;

  return (
    <>
      <div className="history">
        <div className="history-container">
          <div className="sch-title">
            <h1 className="title">History Les</h1>
          </div>
          {schedules.map((item) => {
            if (item.status === true && item.userId.toString() == user) {
              return (
                <div className="sch-wrapper-card" key={item.id}>
                  <div className="sch-card-item">
                    <div className="shc-card-left">
                      <h3>
                        {item.jenjangMateri} : {item.topik}
                      </h3>
                      <p>
                        Pengajar :{" "}
                        <span>
                          {teachers.map((teacher) => {
                            if (teacher.id == item.teacherId) {
                              return teacher.nama;
                            }
                          })}
                        </span>
                      </p>
                      <p>
                        Hari/Tanggal :{" "}
                        <span>
                          {new Date(item.tanggal).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </p>
                      <p>
                        Status :{" "}
                        <span>
                          {item.status === true ? "Selesai" : "Belum Selesai"}
                        </span>
                      </p>
                    </div>
                    <div className="sch-card-right">
                      <Link to={"/review"}>
                        <button className="btn-detail-sesi">
                          Review Pengajar
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default HistoryLes;
