import React, { useEffect } from 'react'
import EditIcon from '../images/edit-icon.svg'
import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const EditBio = ({ teacher }) => {
    const [editNama, setEditNama] = useState(teacher.nama)
    const [editEmail, setEditEmail] = useState(teacher.email)
    const [editHp, setEditHp] = useState(parseInt(teacher.noHp))
    const [editDeskripsi, setEditDeskripsi] = useState(teacher.deskripsi)
    const [editFoto, setEditFoto] = useState(teacher.foto)

    const [bioPopUp, setBioPopUp] = useState(false)

    const toggleBioPopUp = () => {
        setBioPopUp(!bioPopUp)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleEditBio()
        const datasend = { ...teacher, nama: editNama, email: editEmail, noHp: editHp, foto: editFoto, deskripsi: editDeskripsi }
    };

    const handleEditBio = () => {
        axios.put(`https://634a01375df95285140a732e.mockapi.io/teachers/${teacher.id}`, {
            ...teacher, nama: editNama, email: editEmail, noHp: editHp, foto: editFoto, deskripsi: editDeskripsi
        }).then((res) => {
            console.log(res.data);
            window.location.reload()
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="edit-container">
            <Link to='/admin' className='return'>Kembali ke Dashboard</Link>
            <div className="edit-biodata">
                <div>
                    <p className="edit-header">Biodata</p>
                    <img src={EditIcon} alt="" onClick={toggleBioPopUp} />
                </div>
                <div className="edit-header-top">
                    <img src={`https://drive.google.com/uc?export=view&id=${teacher.foto}`} alt="" />
                    <div className="info">
                        <p><strong>Nama:</strong> {teacher.nama}</p>
                        <p><strong>Email:</strong> {teacher.email}</p>
                        <p><strong>No. HP:</strong> {teacher.noHp}</p>
                    </div>
                </div>
                <p>{teacher.deskripsi}</p>
            </div>

            {bioPopUp ?
                <form className='pop-up-form' action="" onSubmit={handleSubmit}>
                    <div className="popup-edit-biodata">
                        <p className="popup-header">Biodata</p>
                        <label htmlFor="edit-nama">Nama</label>
                        <input type="text" id='edit-nama' value={editNama} onChange={(e) => setEditNama(e.target.value)} />

                        <label htmlFor="">Email</label>
                        <input type="email" id='edit-email' value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />

                        <label htmlFor="edit-noHp">No. HP</label>
                        <input type="number" id='edit-noHp' value={editHp} onChange={(e) => setEditHp(e.target.value)} />

                        <label htmlFor="edit-foto">Foto</label>
                        <input type="text" id='edit-foto' value={editFoto} onChange={(e) => setEditFoto(e.target.value)} />

                        <label htmlFor="edit-deskripsi">Deskripsi</label>
                        <textarea name="edit-deskripsi" id="edit-deskripsi" cols="30" rows="10" value={editDeskripsi} onChange={(e) => setEditDeskripsi(e.target.value)}></textarea>

                        <button type='submit' >Edit Biodata</button>
                    </div>
                </form>
                : <></>}
        </div>
    )
}

export default EditBio