import React, { useEffect, useState } from 'react'
import ChevronDown from '../images/chevron-down.svg'
import ChevronUp from '../images/chevron-up.svg'
import "../styles/RequestList.css";
import "../styles/DetailRequest.css";
import "../styles/AdminOrder.css";
import axios from 'axios';

const OrderCardAdmin = ({ item, teachers, users, stateChanger }) => {
    const [detail, setDetail] = useState(false)
    const [approval, setApproval] = useState("Menunggu Approval")

    const toggleDetail = () => {
        setDetail(!detail)
    }

    const getApproval = (approval) => {
        if (approval == "Menunggu Approval")
            return ("approval waiting")
        else if (approval == "Order Rejected")
            return ("approval rejected")
        else if (approval == "Order Accepted")
            return ("approval accepted")
    }

    const handleApproval = (approval, id) => {
        axios.put(`https://634a01375df95285140a732e.mockapi.io/order/${id}`, {
            ...item, "approval": approval
        }).then((res) => {
            console.log(res.data);
            setApproval(approval)
            stateChanger(approval)
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleSesiSelesai = () => {

    }

    return (
        <div className="pesanan admin">

            <div className="header-pesanan">
                <p className="urutan-pesanan">Pesanan #{item.id}</p>
                <p className={getApproval(item.approval)}>{item.approval}</p>
            </div>

            {item.approval == "Menunggu Approval" ?
                <div className="pesanan-approval">
                    <button className="pesanan-approval-btn rej" onClick={() => handleApproval("Order Rejected", item.id)}>Reject Order</button>
                    <button className="pesanan-approval-btn acc" onClick={() => handleApproval("Order Accepted", item.id)}>Accept Order</button>
                </div>
                : <></>
            }

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

                    {users.map((user, index) => {
                        if (user.id == item.userId)
                            return (
                                <div className="pesanan-user" key={index}>
                                    <p className="pesanan-sub-judul">Pemesan</p>
                                    <div className="info-text">
                                        <p className="nama">Nama: {user.nama}</p>
                                        <p className="pesanan-user-email">Email: {user.email}</p>
                                        <p className="pesanan-user-nohp"> Nomor HP: {user.noHp}</p>
                                    </div>
                                </div>
                            )
                    })}

                </>
            }

            <div className="admin-toggle-detail" onClick={toggleDetail}>{detail ? <img src={ChevronUp} alt="" /> : <img src={ChevronDown} alt="" />}</div>
        </div>
    )
}

export default OrderCardAdmin