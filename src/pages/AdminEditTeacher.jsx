import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import EditBio from '../components/EditBio'
import EditIcon from '../images/edit-icon.svg'
import { getTeachers } from '../redux/action/teacherAction'
import '../styles/EditTeacherAdmin.css'

const AdminEditTeacher = () => {

    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        axios
            .get("https://634a01375df95285140a732e.mockapi.io/teachers")
            .then((res) => {
                const result = res.data
                setTeacherList(result);
                console.log(teacherList)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const [teacherList, setTeacherList] = useState([])

    return (
        <>
            {
                teacherList.map((teacher, index) => {
                    if (teacher.id == id) {
                        return (
                            <EditBio teacher={teacher} key={index} />
                        )
                    }
                })
            }
        </>
    )
}

export default AdminEditTeacher