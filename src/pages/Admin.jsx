import React, { useState } from 'react'
import AdminOrder from './AdminOrder'
import AdminTeacher from './AdminTeacher'

const Admin = () => {
    const [isPesanan, setIsPesanan] = useState(true);
    const [isTeacher, setIsTeacher] = useState(false);

    const togglePesanan = () => {
        setIsPesanan(true)
        setIsTeacher(false)
    }

    const toggleTeacher = () => {
        setIsTeacher(true)
        setIsPesanan(false)
    }

    return (
        <>
            <h1>Hello Admin!</h1>
            <div className="admin-menu">
                <button onClick={togglePesanan}>Daftar Pesanan</button>
                <button onClick={toggleTeacher}>Daftar Teacher</button>
            </div>

            {isPesanan ? <AdminOrder /> : <></>}

            {isTeacher ? <AdminTeacher /> : <></>}
        </>
    )
}

export default Admin