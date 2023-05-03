import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Api_Address from '../../../env'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faMapMarked, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from 'react'

const SosCenterUnitCreate = () => {

    const { darkMode } = useContext(ThemeContext)

    const navigate = useNavigate()

    const [unit, setUnit] = useState({
        name_tm: "",
        name_en: "",
        name_ru: "",
        phone_num: "",
        password: "",
        longitude: "",
        latitude: "",
        soId: "",
        checked: "",
    })

    const handleChange = (e) => {
        setUnit((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if (!unit.name_tm) {
            toast.error("Adyny (tm) ýazyň")
        }
        else if (!unit.name_en) {
            toast.error("Adyny (en) ýazyň")
        }
        else if (!unit.name_ru) {
            toast.error("Adyny (ru) ýazyň")
        }
        else if (!unit.phone_num) {
            toast.error("Adyny (ru) ýazyň")
        }
        else if (!unit.password) {
            toast.error("Acar sozunizi ýazyň")
        }
        else if (!unit.longitude) {
            toast.error("Koordinata I ýazyň")
        }
        else if (!unit.latitude) {
            toast.error("Koordinata II ýazyň")
        }
        else if (!unit.soId) {
            toast.error("SOS saylan")
        }
        else if (!unit.checked) {
            toast.error("Tassyklan")
        }
        else {
            await axios.post(`${Api_Address}api/v1/unit/create`, unit, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate('/sos/units')
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
                        <div>Category Create</div>
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
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">+993 </span>
                                        <input onChange={handleChange} name='phone_num' type="number" min="60000000" max="65999999" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Password</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faKey} /></span>
                                        <input onChange={handleChange} name='password' type="password" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Latitude</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faMapMarked} /></span>
                                        <input onChange={handleChange} name='latitude' type="number" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">Longitude</label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text"><FontAwesomeIcon icon={faMapMarkedAlt} /></span>
                                        <input onChange={handleChange} name='longitude' type="number" className="form-control rounded-0" autoComplete="off" />
                                    </div>
                                </div>

                                <div className="col-xl-6 col-lg-6 col-md-6 col-12 mb-3">
                                    <label className="form-label fw-bold">SOS</label>
                                    <select name='soId' className="form-select" onChange={handleChange}>
                                        <option defaultValue>Select</option>
                                        {soses.map(sos => (
                                            <option key={sos.id} value={sos.id}>{sos.name_tm}</option>
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

export default SosCenterUnitCreate