import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import axios from "axios";
import Api_Address from "../../../env";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MapC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { authState } = useContext(AuthContext);

    const id = location.state.sosData.id;

    const cancelSos = async () => {
        await axios
            .post(`${Api_Address}api/v1/sossubmit/edit/` + id, {
                status: "Canceled",
            })
            .then((res) => {
                toast.success(res.data.success);
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <div className="section">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-12 p-0">
                        <iframe src={`//maps.google.com/maps?q=${location.state.sosData.latitude},${location.state.sosData.longitude}&z=15&output=embed`} title="map" allowFullScreen="" loading="lazy" className="map-frame" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="col-lg-4 col-md-4 col-12 my-5 ">
                        <div className="ms-3">
                            {
                                !authState.status ? null :
                                    <>
                                        <div className="my-4">
                                            <h4>Siziň maglumatlaryňyz: </h4>
                                            <p> {authState.name} {authState.surname} </p>
                                        </div>
                                        <div className="my-4">
                                            <h4>Siziň telefon belgiňiz: </h4>
                                            <p>+993{authState.phone_num}</p>
                                        </div>
                                    </>
                            }
                            <div className="my-4">
                                <h4>Siziň koordinatalaryňyz: </h4>
                                <p> {location.state.sosData.latitude}; {location.state.sosData.longitude} </p>
                            </div>
                            <div className="my-4">
                                <h4>Siziň ip salgyňyz: </h4>
                                <p>{location.state.sosData.ip}</p>
                            </div>
                            <div className="my-4">
                                <h4>Çagyryşyň id-sy: </h4>
                                <p>{location.state.sosData.id}</p>
                            </div>
                            <div className="my-4">
                                <h4>Size iň ýakyn halas ediji topary: </h4>
                                <p>{location.state.sosData.nearest.name_tm}</p>
                            </div>
                            <div className="my-4">
                                <h4>Toparyň takmynan gelmeli wagty: </h4>
                                <p>{location.state.sosData.time} minut</p>
                            </div>
                            <div className="my-4">
                                <h4>Çagyryşyň statusy: </h4>
                                <p>{location.state.sosData.status}</p>
                            </div>
                            <button onClick={cancelSos} className="inform-btn mt-5 text-decoration-none">
                                Çagyryşy yzyna gaýtar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default MapC;
