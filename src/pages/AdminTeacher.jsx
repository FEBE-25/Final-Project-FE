import React, { useEffect } from 'react'
import EditIcon from '../images/edit-icon.svg'
import DeleteIcon from '../images/delete-icon.svg'
import AddIcon from '../images/add-icon.svg'
import '../styles/AdminTeacher.css'
import { useDispatch, useSelector } from 'react-redux'
import { getTeachers } from '../redux/action/teacherAction'

const AdminTeacher = () => {

    useEffect(() => {
        dispatch(getTeachers());
        console.log(teachers)
    }, []);

    const dispatch = useDispatch();

    const { teachers } = useSelector((state) => state.teachers);

    return (
        <div className="teacher-container admin">

            <div className="teacher-admin-header">
                <div className="search-teacher">
                    <label htmlFor="cari-nama">Nama</label>
                    <input type="text" id='cari-nama' placeholder='cari teacher' />
                </div>
                <div className="add-teacher">
                    <button>
                        <img src={AddIcon} alt="add-icon" />
                        <p>Tambah Teacher Baru</p>
                    </button>
                </div>
            </div>

            <table className="teacher-table">
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>No HP</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>

                    {teachers.map((teacher, index) => {
                        return (
                            <tr key={index}>
                                <td>{teacher.nama}</td>
                                <td>{teacher.email}</td>
                                <td>{teacher.noHp}</td>
                                <td className='action'>
                                    <img src={EditIcon} alt="edit-icon" />
                                    <img src={DeleteIcon} alt="delete-icon" />
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default AdminTeacher