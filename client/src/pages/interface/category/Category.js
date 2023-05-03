import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Api_Address from "../../../env";
import { toast } from "react-toastify";
import { getDistance, findNearest } from "geolib";
import i18n from "i18next";

const Category = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [units, setUnits] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [nearest, setNearest] = useState();
    const [time, setTime] = useState();
    let sosData = {
        id: "",
        ip: "",
        latitude: "",
        longitude: "",
        status: "",
        disasterId: "",
    };
    useEffect(() => {
        if (latitude !== undefined && longitude !== undefined && units.length !== 0) {
            let distance;
            setNearest(findNearest({ latitude: latitude, longitude: longitude }, units));
            distance = getDistance({ latitude: latitude, longitude: longitude }, findNearest({ latitude: latitude, longitude: longitude }, units));
            setTime(((distance / 1000 / 65) * 60).toFixed(0));
        }
    }, [latitude, longitude, nearest, time, units]);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/unit`).then((res) => {
                setUnits(res.data.unit);
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/disaster`).then((res) => {
                setCategories(res.data.disaster);
            });
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            //LATUDE ATUDE "MERO MADE"
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (err) => console.log(err)
            );
        };
        fetchData();
    }, []);

    const handleClick = async (id) => {
        await axios
            .post(`${Api_Address}api/v1/sossubmit/create`, {
                latitude: latitude,
                longitude: longitude,
                disasterId: id,
                unitId: nearest.id,
            })
            .then((res) => {
                sosData = {
                    id: res.data.submit.id,
                    ip: res.data.submit.ip_address,
                    latitude: res.data.submit.latitude,
                    longitude: res.data.submit.longitude,
                    status: res.data.submit.status,
                    disasterId: res.data.submit.disasterId,
                    time: time,
                    nearest: nearest,
                };
                toast.success(res.data.success);
            })
            .catch((res) => {
                toast.error(res.data.error);
            });
        navigate("/map", { state: { sosData: sosData } });
    };

    const lang = i18n.language;

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    {categories
                        .slice()
                        .sort((a, b) => (a.id < b.id ? -1 : 1))
                        .map((category, index) => (
                            <div className="col-xl-6 col-md-6 col-12 mb-4" key={index}>
                                <div onClick={() => handleClick(category.id)} className="card h-100 rounded-3 border-0 shadow" style={{ cursor: "pointer" }}>
                                    <img src={`${Api_Address}img/disaster/${category.disaster_img}`} alt="" className="card-img h-100" />
                                    <div className="card-img-overlay d-flex justify-content-center align-items-center text-white p-4" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                                        <h1 className="card-title category-title mb-3">{lang === "tm" ? category.name_tm : lang === "en" ? category.name_en : lang === "ru" ? category.name_ru : ""}</h1>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Category;
