import axios from 'axios'
import React, { useState } from 'react'

const ReviewPopUp = ({ teacher, user, item }) => {

    const [bintang, setBintang] = useState(parseInt("0"))
    const [deskripsi, setDeskripsi] = useState("")
    const [nama, setNama] = useState(user.nama)

    const handleSubmit = (e) => {
        e.preventDefault()
        const dataUlasan = teacher.review;
        dataUlasan.push({ bintang, nama, deskripsi })
        handleReview(dataUlasan)
        handleStatus()
    }

    const handleReview = (dataReview) => {
        axios.put(`https://634a01375df95285140a732e.mockapi.io/teachers/${teacher.id}`, {
            ...teacher, review: dataReview
        }).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleStatus = () => {
        axios.put(`https://634a01375df95285140a732e.mockapi.io/order/${item.id}`, {
            ...item, status: "selesai"
        }).then((res) => {
            console.log(res.data);
            window.location.reload()
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            {item.status ? <></> :

                <form className='review-popup' action="" onSubmit={handleSubmit}>
                    <p className='review-popup-header'>Berikan Rating kepada Pengajarmu</p>
                    <label htmlFor="bintang">Bintang</label>
                    <input type="number" id='bintang' min="0" max="5" value={bintang} onChange={(e) => setBintang(parseInt(e.target.value))} />
                    <label htmlFor="ulasan">Ulasan</label>
                    <textarea name="" id="ulasan" cols="30" rows="10" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}></textarea>
                    <button type='submit'>Kirim Ulasan</button>
                </form>
            }
        </>
    )
}

export default ReviewPopUp