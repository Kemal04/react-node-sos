import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Api_Address from '../../../env'
import { useEffect } from 'react'

const SosCenterNotificationCreate = () => {

    const { darkMode } = useContext(ThemeContext)

    const navigate = useNavigate()

    const [notification, setNotification] = useState({
        title_tm: "",
        title_en: "",
        title_ru: "",
        description_tm: "",
        description_en: "",
        description_ru: "",
        soId: "",
        latitude: "",
        longitude: "",
    })

    const handleChange = (e) => {
        setNotification((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if (!notification.title_tm) {
            toast.error("Adyny (tm) ýazyň")
        }
        else if (!notification.title_en) {
            toast.error("Adyny (en) ýazyň")
        }
        else if (!notification.title_ru) {
            toast.error("Adyny (ru) ýazyň")
        }
        else if (!notification.description_tm) {
            toast.error("Mazmuny (tm) ýazyň")
        }
        else if (!notification.description_en) {
            toast.error("Mazmuny (en) ýazyň")
        }
        else if (!notification.description_ru) {
            toast.error("Mazmuny (ru) ýazyň")
        }
        else if (!notification.soId) {
            toast.error("SOS saylan")
        }
        else if (!notification.latitude) {
            toast.error("Latitude yazyn")
        }
        else if (!notification.longitude) {
            toast.error("Longitude yazyn")
        }
        else {
            await axios.post(`${Api_Address}api/v1/notification/create`, notification, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate('/sos/notifications')
                }).catch((res) => {
                    toast.error(res.response.data.error)
                });
        }
    }

    const [soses, setSoses] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/sos`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((res) => {
                setSoses(res.data.sos)
            })
        }
        fetchData()
    }, [])

    return (
        <>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='h5'>
                        <div>Notification Create</div>
                    </div>
                </div>
                <div className={`card-body d-flex justify-content-center align-items-center ${darkMode ? "bg-dark-blue text-white" : ""}`} style={{ height: "711px" }}>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8'>
                            <div className='row'>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (tm)</label>
                                    <input onChange={handleChange} name='title_tm' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (en)</label>
                                    <input onChange={handleChange} name='title_en' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (ru)</label>
                                    <input onChange={handleChange} name='title_ru' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Description (ru)</label>
                                    <input onChange={handleChange} name='description_tm' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Description (ru)</label>
                                    <input onChange={handleChange} name='description_en' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Description (ru)</label>
                                    <input onChange={handleChange} name='description_ru' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Latitude</label>
                                    <input onChange={handleChange} name='latitude' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Longitude</label>
                                    <input onChange={handleChange} name='longitude' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">SOS</label>
                                    <select name='soId' className="form-select" onChange={handleChange}>
                                        <option defaultValue>Select</option>
                                        {soses.map(sos => (
                                            <option key={sos.id} value={sos.id}>{sos.name_tm}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className='d-grid mt-3'>
                                    <button onClick={handleClick} className={`btn ${darkMode ? "btn-outline-light" : "btn-primary"}`}>Goşmak</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SosCenterNotificationCreate