import React, { useEffect, useState } from 'react'
import "../styles/RequestList.css";
import "../styles/DetailRequest.css";
import { useDispatch, useSelector } from 'react-redux';
import { getTeachers } from "../redux/action/teacherAction";

const RequestCard = ({ item, urutan }) => {
    const [detail, setDetail] = useState(false)

    const toggleDetail = () => {
        setDetail(!detail)
    }

    const dispatch = useDispatch();
    const { teachers } = useSelector((state) => state.teachers);
    useEffect(() => {
        dispatch(getTeachers());
    }, []);

    const getApproval = (approval) => {
        if (approval == "Menunggu Approval")
            return ("approval waiting")
        else if (approval == "Order Rejected")
            return ("approval rejected")
        else if (approval == "Order Accepted")
            return ("approval accepted")
    }

    return (
        // <p>{item.biaya}</p>
        <div className="pesanan">

            <div className="header-pesanan">
                <p className="urutan-pesanan">Pesanan #{item.id}</p>
                <p className={item.status ? "status-pesanan sudah" : "status-pesanan belum"}>{item.status ? ("Telah Dibayar") : ("Menunggu Pembayaran")}</p>
            </div>

            {item.status ? <p className="pesanan-approval user">Approval Admin: {item.approval}</p> : <p className="pesanan-biaya">Rp{item.biaya}.000</p>}






            {item.status ? <></> : <p className="pesanan-btn-bayar">Bayar Pesanan</p>}


            {
                detail &&

                <>
                    <div className="pesanan-waktu">
                        <p className="pesanan-sub-judul">Waktu Sesi</p>
                        <p className="tanggal">Tanggal: {item.tanggal}</p>
                        <p className="mulai">Jam mulai: {item.jamMulai}</p>
                        <p className="lama">Durasi sesi: {item.durasi} menit</p>
                    </div>

                    <div className="pesanan-materi">
                        <p className="pesanan-sub-judul">Materi Sesi</p>
                        <p className="jenjang-materi">Jenjang materi: {item.jenjangMateri}</p>
                        <p className="topik-materi">Topik materi: {item.topik}</p>
                        <p className="detail-materi">Detail materi: {item.detailTopik}</p>
                        <p className="tambahan-materi">Tambahan: {item.tambahan}</p>
                    </div>

                    <div className="pesanan-lokasi">
                        <p className="pesanan-sub-judul">Lokasi Sesi</p>
                        <p className="mode-lokasi">Mode pembelajaran: {item.modeBelajar}</p>
                        <p className="alamat-lokasi">alamat: {item.alamat}</p>
                        <p className="maps-lokasi">maps: {item.maps}</p>
                    </div>

                    {teachers.map((teacher, index) => {
                        if (teacher.id == item.teacherId)
                            return (
                                <div className="pesanan-teacher" key={index}>
                                    <p className="pesanan-sub-judul">Pengajar</p>
                                    <div className="info-text">
                                        <p className="nama">Nama: {teacher.nama}</p>
                                        <p className="pesanan-edukasi">Universitas: {teacher.edukasi[0].lokasi}</p>
                                        <p className="pesanan-edukasi"> Jurusan: {teacher.edukasi[0].jurusan}</p>
                                    </div>
                                </div>
                            )
                    })}
                </>
            }

            <p onClick={toggleDetail} className="toggle-detail">{detail ? <span>Tutup Detail</span> : <span>Lihat Detail</span>}</p>


        </div>
    )
}

export default RequestCard