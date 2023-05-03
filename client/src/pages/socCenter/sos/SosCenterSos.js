import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Api_Address from "../../../env";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SosCenterSos = () => {
    const { darkMode } = useContext(ThemeContext);

    const [soses, setSoses] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            await axios
                .get(`${Api_Address}api/v1/sossubmit`, {
                    headers: {
                        accessToken: localStorage.getItem("accessToken"),
                    },
                })
                .then((res) => {
                    setSoses(res.data.sossubmit);
                });
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        await axios.delete(`${Api_Address}api/v1/sossubmit/delete/` + id, {
            headers: {
                accessToken: localStorage.getItem("accessToken"),
            },
        }).then((res) => {
            toast.success(res.data.success);
            const del = soses.filter((soses) => id !== soses.id);
            setSoses(del);
        }).catch((error) => {
            toast.error(error.message);
        });
    };

    const onRoad = async (id) => {
        await axios.post(`${Api_Address}api/v1/sossubmit/edit/${id}`, { status: "On-road" }, {
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

    const helped = async (id) => {
        await axios.post(`${Api_Address}api/v1/sossubmit/edit/${id}`, { status: "Helped" }, {
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

    const blocked = async (id) => {
        await axios.post(`${Api_Address}api/v1/sossubmit/edit/${id}`, { status: "Blocked" }, {
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

    return (
        <>
            <div className="card border-0 shadow my-5">
                <div className={`card-header p-3 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-12">
                            <div className={`h5 d-flex align-items-center text-decoration-none ${darkMode ? "text-white" : "text-dark"}`}>
                                <div>SOS ({soses.length})</div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-6 d-flex justify-content-end">
                            <input className="form-control form-control-sm" type="text" placeholder="Search..." />
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-3 col-6 d-flex justify-content-end">
                            <select className={`form-select form-select-sm select-month me-2 ${darkMode ? "bg-dark-blue-footer text-white" : null}`}>
                                <option defaultValue>All followers</option>
                                <option>Concert Choir</option>
                                <option>Clubchem</option>
                                <option>Chamber Music Society</option>
                                <option>Alpha Chi Omega</option>
                                <option>Alpine Ski Club</option>
                                <option>Career Club</option>
                                <option>Musical Club</option>
                                <option>Asymptones</option>
                                <option>Clubchem</option>
                                <option>Brain Trust</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`card-body p-3 ${darkMode ? "bg-dark-blue text-white" : ""}`}>
                    <div className="row justify-content-center aling-items-center">
                        <div className="col-xl-12">
                            <table className={`table table-striped ${darkMode ? "text-white" : null}`}>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Disaster</th>
                                        <th scope="col">Ip address</th>
                                        <th scope="col">Latitude</th>
                                        <th scope="col">Longitude</th>
                                        <th scope="col">SosId</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Setting</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {soses
                                        .slice()
                                        .sort((a, b) => (a.id < b.id ? 1 : -1))
                                        .map((sos, index) => (
                                            <tr key={index}>
                                                <th className={`${darkMode ? "text-white" : null}`} scope="row">{index + 1}</th>
                                                <td className={`${darkMode ? "text-white" : null}`}>{sos.disasterId === null ? "Bos" : sos.disaster.name_tm}</td>
                                                <td className={`${darkMode ? "text-white" : null}`}>{sos.ip_address}</td>
                                                <td className={`${darkMode ? "text-white" : null}`}>{sos.latitude}</td>
                                                <td className={`${darkMode ? "text-white" : null}`}>{sos.longitude}</td>
                                                <td className={`${darkMode ? "text-white" : null}`}>{sos.unitId === null ? "Bos" : sos.unit.name_tm}</td>
                                                <td className={`${darkMode ? "text-white" : null}`}>
                                                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                        <li className="nav-item dropdown">
                                                            <Link to='/sos/soses' className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                {sos.status}
                                                            </Link>
                                                            <ul className="dropdown-menu">
                                                                <li><button onClick={() => onRoad(sos.id)} className="dropdown-item text-warning fw-bold">On-road</button></li>
                                                                <li><button onClick={() => helped(sos.id)} className="dropdown-item text-success fw-bold">Helped </button></li>
                                                                <li><button onClick={() => blocked(sos.id)} className="dropdown-item text-black fw-bold">Blocked</button></li>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </td>
                                                <td className="d-flex justify-content-around align-items-center">
                                                    <button className="btn btn-outline-danger" onClick={() => handleDelete(sos.id)}>
                                                        <FontAwesomeIcon icon={faTrashAlt} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SosCenterSos;
