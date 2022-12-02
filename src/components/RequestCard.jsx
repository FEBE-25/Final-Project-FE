import React, { useEffect, useState } from 'react'
import "../styles/RequestList.css";
import "../styles/DetailRequest.css";
import ChevronDown from '../images/chevron-down.svg'
import ChevronUp from '../images/chevron-up.svg'
import { useDispatch, useSelector } from 'react-redux';
import { getTeachers } from "../redux/action/teacherAction";
import ReviewPopUp from './ReviewPopUp';

const RequestCard = ({ item, user }) => {
    const [detail, setDetail] = useState(false)
    const [diskusi, setDiskusi] = useState(false)
    const [ulas, setUlas] = useState(false)

    const toggleDetail = () => {
        setDetail(!detail)
    }

    const toggleDiskusi = () => {
        setDiskusi(true)
        setUlas(false)
    }

    const toggleUlas = () => {
        setUlas(true)
        setDiskusi(false)
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

    const hubungi = (nomor) => {
        const link = `https://wa.me/${nomor}/?text=Hai kak, saya`
        window.location.assign(link);
    }

    return (
        // <p>{item.biaya}</p>
        <div className="pesanan">

            <div className="header-pesanan">
                <p className="urutan-pesanan">Pesanan #{item.id}</p>
                <p className={getApproval(item.approval)}>{item.approval}</p>
            </div>

            <p className="tanggal">Tanggal Les: {item.tanggal}</p>
            <p className="detail-materi">Detail Materi: {item.detailTopik}</p>
            {teachers.map((teacher, index) => {
                if (teacher.id == item.teacherId)
                    return (
                        <div className="pesanan-teacher" key={index}>
                            <p className="pesanan-sub-judul">Pengajar</p>
                            <div className="info-text">
                                <p className="nama">Nama: {teacher.nama}</p>
                                <p className='pesanan-noHp'>No. Hp: {teacher.noHp}</p>
                                <p className="pesanan-email">Email: {teacher.email}</p>
                                <p className="pesanan-edukasi">Universitas: {teacher.edukasi[0].lokasi}</p>
                                <p className="pesanan-edukasi"> Jurusan: {teacher.edukasi[0].jurusan}</p>
                            </div>


                            {item.status ? <p className='les-berakhir'>Yey Sesi Lesmu telah Terselesaikan</p> : <></>
                            }

                            {item.approval == "Order Accepted" && !item.status ? <div className="konfirmasi">
                                <p>Apakah kamu sudah menjalani sesi?</p>
                                <div className="konfirmasi-btn">
                                    <button onClick={toggleDiskusi}>Belum</button>
                                    <button onClick={toggleUlas}>Sudah</button>
                                </div>
                            </div> : <></>}

                            {diskusi ? <p className='kontak-teacher' onClick={() => hubungi(teacher.noHp)}>Diskusikan sesi dengan teacher</p> : <></>}

                            {ulas ?
                                <ReviewPopUp teacher={teacher} user={user} item={item} />
                                : <></>}
                        </div>
                    )
            })}

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
                        {item.modeBelajar == "offline" ?
                            <>
                                <p className="alamat-lokasi">alamat: {item.alamat}</p>
                                <p className="maps-lokasi">maps: {item.maps}</p>
                            </>
                            : <></>}
                    </div>

                </>
            }

            <div className="admin-toggle-detail" onClick={toggleDetail}>{detail ? <img src={ChevronUp} alt="" /> : <img src={ChevronDown} alt="" />}</div>


        </div>
    )
}

export default RequestCard