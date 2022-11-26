import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import '../styles/orderform.css'

const OrderForm = () => {

    const [userId, setUserId] = useState("")
    const [teacherId, setTeacherId] = useState("")
    const [biaya, setBiaya] = useState(50000)
    const [biayaTotal, setBiayaTotal] = useState("")
    const [jenjangMateri, setJenjangMateri] = useState("")
    const [topik, setTopik] = useState("")
    const [detailTopik, setDetailTopik] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [jamMulai, setJamMulai] = useState("")
    const [durasi, setDurasi] = useState(0)
    const [modeBelajar, setModeBelajar] = useState("")
    const [alamat, setAlamat] = useState("")
    const [maps, setMaps] = useState("")
    const [tambahan, setTambahan] = useState("")
    const [dataOrder, setDataOrder] = useState({})

    const { teacher } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.user)

    const handleSubmit = (e) => {
        e.preventDefault();
        postOrder()
    }

    const navigation = useNavigate()

    const postOrder = () => {
        const dataOrder = { userId, teacherId, biayaTotal, jenjangMateri, topik, detailTopik, tanggal, jamMulai, durasi, modeBelajar, alamat, maps, tambahan }
        axios.post('https://634a01375df95285140a732e.mockapi.io/order', dataOrder).then(res => {
            navigation('/request')
        })
    }

    useEffect(() => {
        setBiayaTotal(biaya * (durasi / 60))
    }, [durasi])

    useEffect(() => {
        setTeacherId(teacher.id)
        setUserId(user.id)
    }, [])

    return (
        <div className="form-order">
            <h1>Pesan Les</h1>
            <p>Yuk jadwalkan les sekarang dan mulai belajar </p>
            <form action="" className="form-container" onSubmit={handleSubmit}>
                <div className="pengajar-les">
                    <img src={`https://drive.google.com/uc?export=view&id=${teacher.foto}`} alt="foto-pengajar" />
                    <p>{teacher.nama}</p>
                    <p>{teacher.edukasi[0].lokasi} | {teacher.edukasi[0].jurusan}</p>
                    <p>Biaya Sesi</p>
                    <p>Rp50.000 | 1 jam</p>
                </div>

                <div className="materi">
                    <h3 className="form-heading">Materi</h3>
                    <p>Jenjang pendidikan</p>

                    <div className="input-jenjang">
                        <input type="radio" name="pendidikan" value="SD" id="rd-sd" checked={jenjangMateri === "SD"} onChange={(e) => { setJenjangMateri(e.target.value) }} />
                        <label htmlFor="rd-sd">SD</label>
                        <input type="radio" name="pendidikan" value="SMP" id="rd-smp" checked={jenjangMateri === "SMP"} onChange={(e) => { setJenjangMateri(e.target.value) }} />
                        <label htmlFor="rd-smp">SMP</label>
                        <input type="radio" name="pendidikan" value="SMA" id="rd-sma" checked={jenjangMateri === "SMA"} onChange={(e) => { setJenjangMateri(e.target.value) }} />
                        <label htmlFor="rd-sma">SMA</label>
                    </div>

                    <div className="input-topik">
                        <p>Topik</p>
                        <input type="text" placeholder="Matematika" value={topik} onChange={(e) => { setTopik(e.target.value) }} />
                    </div>

                    <div className="input-detail-topik">
                        <p>Detail Topik</p>
                        <textarea name="" id="detail-topik" cols="100" rows="5"
                            placeholder="Jelaskan materi apa yang kamu ingin pelajari" value={detailTopik} onChange={(e) => { setDetailTopik(e.target.value) }}></textarea>
                    </div>
                </div>

                <div className="waktu-les">
                    <h3 className="form-heading">Waktu Les</h3>

                    <div className="waktu-input">
                        <div className="waktu-top">
                            <p>Tanggal Les</p>
                            <input type="date" id="date" value={tanggal} onChange={(e) => { setTanggal(e.target.value) }} />
                        </div>

                        <div className="waktu-bottom">
                            <div className="mulai-container">
                                <p>Jam Mulai</p>
                                <input type="time" id="mulai" value={jamMulai} onChange={(e) => { setJamMulai(e.target.value) }} />
                            </div>

                            <div className="durasi-container">
                                <p>Durasi</p>
                                <input type="number" placeholder="menit" className="durasi" value={durasi} onChange={(e) => { setDurasi(e.target.value) }} />
                            </div>
                        </div>
                    </div>


                </div>

                <div className="lokasi-les">
                    <h3 className="form-heading">Lokasi Les</h3>

                    <div className="mode-pembelajaran">
                        <input type="radio" name="lokasi" id="rd-on" value="online" checked={modeBelajar === "online"} onChange={(e) => { setModeBelajar(e.target.value) }} />
                        <label htmlFor="rd-on">Online</label>
                        <input type="radio" name="lokasi" id="rd-off" value="offline" checked={modeBelajar === "offline"} onChange={(e) => { setModeBelajar(e.target.value) }} />
                        <label htmlFor="rd-off">Offline</label>
                    </div>

                    <div className="detail-lokasi">
                        <div className="alamat-lengkap">
                            <p>Alamat</p>
                            <textarea name="" id="" cols="30" rows="10" placeholder="Tuliskan alamatmu selengkap mungkin" value={alamat} onChange={(e) => { setAlamat(e.target.value) }}></textarea>
                        </div>
                        <label htmlFor="maps">Lokasi Maps</label>
                        <input type="text" name="maps" placeholder="Link google maps" value={maps} onChange={(e) => { setMaps(e.target.value) }} />
                    </div>
                </div>

                <div className="info-tambahan">
                    <h3 className="form-heading">Informasi Tambahan</h3>
                    <p>Catatan untuk pengajar</p>
                    <textarea name="" id="info-tambahan" placeholder="Banyakin latihan soal ya" value={tambahan} onChange={(e) => { setTambahan(e.target.value) }}></textarea>
                </div>
                <div className="button">
                    <Link to='/teacher' id="btn-batal">Batalkan Pesanan</Link>
                    <button id="btn-pesan" type="submit">Pesan Sekarang</button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm;
