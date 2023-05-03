import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import Api_Address from '../../../env'
import axios from 'axios'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faMapMarked, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'

const AdminSosCenterCreate = () => {

    const { darkMode } = useContext(ThemeContext)

    const navigate = useNavigate()

    const [soses, setSoses] = useState({
        name_tm: "",
        name_en: "",
        name_ru: "",
        phone_num: "",
        latitude: "",
        longitude: "",
        password: "",
        welayatId: "",
        checked: "",
    })

    const handleChange = (e) => {
        setSoses((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if (!soses.name_tm) {
            toast.error("Adyny (tm) ýazyň")
        }
        else if (!soses.name_en) {
            toast.error("Adyny (en) ýazyň")
        }
        else if (!soses.name_ru) {
            toast.error("Adyny (ru) ýazyň")
        }
        else if (!soses.phone_num) {
            toast.error("Telefon belgisini ýazyň")
        }
        else if (!soses.latitude) {
            toast.error("Koordinata I ýazyň")
        }
        else if (!soses.longitude) {
            toast.error("Koordinata II ýazyň")
        }
        else if (!soses.password) {
            toast.error("Açar sözini ýazyň")
        }
        else if (!soses.welayatId) {
            toast.error("Welayat saýlaň")
        }
        else if (!soses.checked) {
            toast.error("Tassyklaň")
        }
        else {
            await axios.post(`${Api_Address}api/v1/sos/create`, soses, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate('/admin/sos-center')
                }).catch((res) => {
                    toast.error(res.response.data.error)
                });
        }
    }


    const [welayats, setWelayats] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/welayat`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                }
            }).then((res) => {
                setWelayats(res.data.welayat)
            })
        }
        fetchData()
    }, [])


    return (
        <>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='h5'>
                        <div>SOS Center Create</div>
                    </div>
                </div>
                <div className={`card-body d-flex justify-content-center align-items-center ${darkMode ? "bg-dark-blue text-white" : ""}`} style={{ height: "711px" }}>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8'>
                            <div className='row'>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (tm)</label>
                                    <input onChange={handleChange} name='name_tm' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (en)</label>
                                    <input onChange={handleChange} name='name_en' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-4 col-lg-4 col-md-4 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (ru)</label>
                                    <input onChange={handleChange} name='name_ru' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Phone Number</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text">+993 </span>
                                        <input onChange={handleChange} name='phone_num' type="number" min="60000000" max="65999999" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                                        <input onChange={handleChange} name='password' type="password" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Latitude</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text"><FontAwesomeIcon icon={faMapMarked} /></span>
                                        <input onChange={handleChange} name='latitude' type="number" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Longitude</label>
                                    <div class="input-group mb-3">
                                        <span class="input-group-text"><FontAwesomeIcon icon={faMapMarkedAlt} /></span>
                                        <input onChange={handleChange} name='longitude' type="number" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Welayats</label>
                                    <select name='welayatId' className="form-select" onChange={handleChange}>
                                        <option defaultValue>Select</option>
                                        {welayats.map(welayat => (
                                            <option key={welayat.id} value={welayat.id}>{welayat.name_tm}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Checked</label>
                                    <select name='checked' onChange={handleChange} className="form-select">
                                        <option defaultChecked>Select</option>
                                        <option value="1">Check</option>
                                        <option value="0">Uncheck</option>
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

export default AdminSosCenterCreate