import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userOut } from '../redux/action/userAction';
import AdminOrder from './AdminOrder'
import AdminTeacher from './AdminTeacher'


const Admin = () => {
    const [isPesanan, setIsPesanan] = useState(true);
    const [isTeacher, setIsTeacher] = useState(false);

    const { user } = useSelector((state) => state.user);

    const togglePesanan = () => {
        setIsPesanan(true)
        setIsTeacher(false)
    }

    const toggleTeacher = () => {
        setIsTeacher(true)
        setIsPesanan(false)
    }

    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleLogOut = () => {
        localStorage.setItem("logged_user", null);
        localStorage.setItem("isLoggedIn", false);
        dispatch(userOut());
        navigation('/')
    };



    return (
        <>
            {user && user.admin ?
                <>
                    <h1 className='admin-title'>Hello Admin!</h1>
                    <p className="log-out" onClick={handleLogOut}>Log Out</p>
                    <div className="admin-menu">
                        <button onClick={togglePesanan} className={isPesanan ? "active" : ""}>Daftar Pesanan</button>
                        <button onClick={toggleTeacher} className={isTeacher ? "active" : ""}>Daftar Teacher</button>
                    </div>

                    {isPesanan ? <AdminOrder /> : <></>}

                    {isTeacher ? <AdminTeacher /> : <></>}
                </>
                :

                <></>}
        </>
    )
}

export default Admin