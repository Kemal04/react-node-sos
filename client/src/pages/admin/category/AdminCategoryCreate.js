import React, { useContext, useState } from 'react'
import { ThemeContext } from '../../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import Api_Address from '../../../env'
import axios from 'axios'
import { toast } from 'react-toastify'

const AdminCategoryCreate = () => {

    const { darkMode } = useContext(ThemeContext)

    const navigate = useNavigate()

    const [category, setCategory] = useState({
        name_tm: "",
        name_en: "",
        name_ru: ""
    })  
    const [img, setImg] = useState('')

    const handleChange = (e) => {
        setCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('name_tm', category.name_tm)
        formData.append('name_en', category.name_en)
        formData.append('name_ru', category.name_ru)
        formData.append('disaster_img', img)

        if (!category.name_tm) {
            toast.error("Adyny (tm) ýazyň")
        }
        else if (!category.name_en) {
            toast.error("Adyny (en) ýazyň")
        }
        else if (!category.name_ru) {
            toast.error("Adyny (ru) ýazyň")
        }
        else if (!img) {
            toast.error("Suraty saýlaň")
        }
        else {
            await axios.post(`${Api_Address}api/v1/disaster/create`, formData, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
                .then((res) => {
                    toast.success(res.data.success)
                    navigate('/admin/categories')
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
                        <div>Category Create</div>
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

                                <div className="col-lg-12 mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <div className="input-group mb-3">
                                        <input name='disaster_img' onChange={(e) => setImg(e.target.files[0])} type="file" className="form-control rounded-0" autoComplete="off" />
                                    </div>
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

export default AdminCategoryCreate