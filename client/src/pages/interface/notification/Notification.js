import axios from "axios";
import React, {useEffect, useState} from "react";
import addNotification from "react-push-notification";
import Api_Address from "../../../env";
import {getDistance} from "geolib";

const Notification = () => {
    const [notifications, setNotifications] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`${Api_Address}api/v1/notification`).then((res) => {
                console.log(res.data.notification);
                setNotifications(res.data.notification);
                console.log(res.data.notification);
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

    useEffect(() => {
        notifications.map((notifi) =>
            addNotification({
                title: notifi.title_tm,
                subtitle: "This is a subtitle",
                message: "description_tm",
                theme: "darkblue",
                native: true, // when using native, your OS will handle theming.
            })
        );
    }, [notifications]);
    return (
        <>
            <div className="container my-5">
                <div className="my-4 h3 text-center">Notifications</div>
                <div className="row">
                    {notifications
                        .slice()
                        .sort((a, b) => (a.id < b.id ? 1 : -1))
                        .map((notification, index) => (
                            <div className="alert alert-3-danger" key={index}>
                                <h3 className="alert-title">{notification.title_tm}</h3>
                                <h5>{notification.so.name_tm}</h5>
                                <p className="alert-content">{notification.description_tm}</p>
                                <h5 className="alert-content">Sizden {getDistance({latitude: latitude, longitude: longitude}, {latitude: notification.latitude, longitude: notification.longitude})} metr uzaklykda.</h5>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Notification;
