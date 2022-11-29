import axios from "axios";
import React, { useEffect, useState } from "react";
// import DetailRequest from "../components/DetailRequest";
import "../styles/RequestList.css";
import { useDispatch, useSelector } from "react-redux";
import { getTeachers } from "../redux/action/teacherAction";
import RequestCard from "../components/RequestCard";
import OrderCardAdmin from "../components/OrderCardAdmin";

function AdminOrder() {
    const [dataRequest, setDataRequest] = useState([]);
    const [detail, setDetail] = useState(false);
    const [listUser, setListUser] = useState({});

    useEffect(() => {
        axios
            .get("https://634a01375df95285140a732e.mockapi.io/order")
            .then((res) => {
                setDataRequest(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        dispatch(getTeachers());
    }, []);

    useEffect(() => {
        axios.get("https://634a01375df95285140a732e.mockapi.io/users").then((res) => {
            setListUser(res.data);
        });
    }, []);

    const dispatch = useDispatch();

    const { teachers } = useSelector((state) => state.teachers);

    return (
        <>
            <div className="order-container">
                <h1 className="order-title">Daftar Sesi</h1>
                {dataRequest.map((item, index) => {
                    return (

                        <OrderCardAdmin key={index} item={item} teachers={teachers} users={listUser} />

                    )
                })}
            </div>
        </>
    );
}

export default AdminOrder;
