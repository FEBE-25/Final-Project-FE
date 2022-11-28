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
    const [detail, setDetail] = useState(false)

    useEffect(() => {
        axios
            .get("https://634a01375df95285140a732e.mockapi.io/order")
            .then((res) => {
                setDataRequest(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const { user } = useSelector((state) => state.user)

    const dispatch = useDispatch();

    const { teachers } = useSelector((state) => state.teachers);

    const toggleDetail = () => {
        setDetail(!detail)
    }

    useEffect(() => {
        dispatch(getTeachers());
    }, []);

    let urutan = 0;

    return (
        <>
            <div className="order-container">
                <h1 className="order-title">Daftar Sesi</h1>
                {dataRequest.map((item, index) => {
                    // if (item.userId == user.id) {
                    urutan++;
                    return (

                        <OrderCardAdmin key={index} item={item} urutan={urutan} teachers={teachers} />

                    )
                    // }
                })}
            </div>
        </>
    );
}

export default AdminOrder;
