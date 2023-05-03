import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Api_Address from '../../../env'
import axios from 'axios'

const AdminWelayatCreate = () => {

    const { darkMode } = useContext(ThemeContext)

    const navigate = useNavigate()

    const [category, setCategory] = useState({
        name_tm: "",
        name_en: "",
        name_ru: ""
    })

    const handleChange = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if (!category.name_tm) {
            toast.error("Adyny (tm) ýazyň")
        }
        else if (!category.name_en) {
            toast.error("Adyny (en) ýazyň")
        }
        else if (!category.name_ru) {
            toast.error("Adyny (ru) ýazyň")
        }
        else {
            await axios.post(`${Api_Address}api/v1/welayat/create`, category, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate('/admin/welayats')
                }).catch((res) => {
                    toast.error(res.response.data.error)
                });
        }
    }
    return (
        <>
            <div className='card border-0 shadow my-5'>
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className='h5'>
                        <div>Welayat Create</div>
                    </div>
                </div>
                <div className={`card-body d-flex justify-content-center align-items-center ${darkMode ? "bg-dark-blue text-white" : ""}`} style={{ height: "711px" }}>
                    <div className='row justify-content-center'>
                        <div className='col-xl-8'>
                            <div className='row'>
                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (tm)</label>
                                    <input onChange={handleChange} name='name_tm' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (en)</label>
                                    <input onChange={handleChange} name='name_en' type="text" className="form-control rounded-0" autoComplete="off" />
                                </div>

                                <div className="col-xl-12 col-lg-12 col-md-12 col-12 mb-3">
                                    <label className="form-label fw-bold">Name (ru)</label>
                                    <input onChange={handleChange} name='name_ru' type="text" className="form-control rounded-0" autoComplete="off" />
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

export default AdminWelayatCreate