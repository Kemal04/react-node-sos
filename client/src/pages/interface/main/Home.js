import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Api_Address from "../../../env";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { useEffect } from "react";

const Home = () => {

    const { t } = useTranslation();

    const { darkMode } = useContext(ThemeContext)

    useEffect(() => {
        const fetchData = async () => {
            //LATUDE ATUDE "MERO MADE"
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    vitness.latitude = position.coords.latitude
                    vitness.longitude = position.coords.longitude
                },
                (err) => console.log(err)
            );
        };
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [vitness, setVitness] = useState({
        latitude: "",
        longitude: "",
        ip_address: "",
        description: "",
        unitId: "45",
    })
    const [img, setImg] = useState('')

    const handleChange = (e) => {
        setVitness((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('latitude', vitness.latitude)
        formData.append('longitude', vitness.longitude)
        formData.append('description', vitness.description)
        formData.append('unitId', vitness.unitId)
        formData.append('vitness_img', img)

        if (!vitness.latitude) {
            toast.error("Latitude ýazyň")
        }
        else if (!vitness.longitude) {
            toast.error("Longitude ýazyň")
        }
        else if (!vitness.description) {
            toast.error("Description ýazyň")
        }
        else if (!vitness.unitId) {
            toast.error("Unit saylan")
        }
        else if (!img) {
            toast.error("Suraty saýlaň")
        }
        else {
            await axios.post(`${Api_Address}api/v1/vitness/create`, formData, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            }).then((res) => {
                toast.success(res.data.success)
                window.location.reload()
            }).catch((res) => {
                toast.error(res.response.data.error)
            });
        }
    }

    return (
        <>
            <div className="header"></div>
            <div className={`section sos`}>
                <h1 className="mb-4 fw-bold">{t("home.1")}</h1>
                <p className="mb-4 text-dark">{t("home.2")}</p>
                <div className="button-div">
                    <div className="sos-wrapper">
                        <div className="video-main">
                            <div className="waves-block">
                                <div className="waves wave-1"></div>
                                <div className="waves wave-2"></div>
                                <div className="waves wave-3"></div>
                            </div>
                            <Link to="/category" className="sos-btn text-decoration-none fw-bold" style={{ fontSize: "50px" }}>
                                SOS
                            </Link>
                        </div>
                        <button type="button" className="btn btn-outline-danger mt-5" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            {t("home.3")}
                        </button>

                    </div>
                </div>
            </div>
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Vitness</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='row'>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Description</label>
                                    <input onChange={handleChange} name='description' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <div className="input-group mb-3">
                                        <input name='vitness_img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} className={`btn ${darkMode ? "btn-outline-light" : "btn-primary"}`}>Add</button>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
