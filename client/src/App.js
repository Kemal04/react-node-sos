import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

//USERINTERFACE
import { Category, Home, Login, Register, Map, Notification, Instructions, InstructionDetail, Volunteer } from "./pages/interface";

//COMPONENTS
import { AdminNavbar, AdminSidebar, Footer, Navbar, ScrollToTop, SosNavbar, SosSidebar, UnitNavbar, UnitSidebar } from "./components";

//ADMIN PAGE
import { Admin, AdminCategories, AdminCategoryCreate, AdminComments, AdminLogin, AdminSetting, AdminSosCenterCreate, AdminSosCenters, AdminSoses, AdminUserCreate, AdminUsers, AdminWelayatCreate, AdminWelayats } from "./pages/admin";

//CONTEXTS
import ThemeContextProvider, { ThemeContext } from "./context/ThemeContext";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Api_Address from "./env";
import { AuthContext } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//SOS PAGE
import { SosCenter, SosCenterBlog, SosCenterBlogCreate, SosCenterLogin, SosCenterNotification, SosCenterNotificationCreate, SosCenterSos, SosCenterUnit, SosCenterUnitCreate } from "./pages/socCenter";
import { useContext } from "react";
import { Unit, UnitLogin, UnitSos } from "./pages/unit";

const App = () => {

    const [authState, setAuthState] = useState({
        name_tm: "",
        latitude: "",
        longitude: "",
        welayatId: "",
        name: "",
        surname: "",
        phone_num: "",
        id: 0,
        status: false,
        role: "User",
    });

    useEffect(() => {
        axios
            .get(`${Api_Address}api/v1/auth/current_user`, {
                headers: {
                    accessToken: localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                if (res.data.error) {
                    setAuthState({ ...authState, status: false, role: "User" });
                } else {
                    setAuthState({
                        name_tm: res.data.name_tm,
                        latitude: res.data.latitude,
                        longitude: res.data.longitude,
                        welayatId: res.data.welayatId,
                        name: res.data.name,
                        surname: res.data.surname,
                        phone_num: res.data.phone_num,
                        id: res.data.id,
                        status: true,
                        role: res.data.role,
                    });
                }
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <AuthContext.Provider value={{ authState, setAuthState }}>
                <ThemeContextProvider>
                    <BrowserRouter>
                        <ToastContainer />
                        <ScrollToTop />

                        <Routes>
                            <Route path="/" element={<HomeLayout />}>
                                <Route path="/" element={<Home />} />

                                <Route path="/category" element={<Category />} />

                                <Route path="/map" element={<Map />} />

                                <Route path="/notification" element={<Notification />} />

                                <Route path="/instructions" element={<Instructions />} />
                                <Route path="/instruction/:intId" element={<InstructionDetail />} />

                                <Route path="/volunteer" element={<Volunteer />} />
                            </Route>

                            {!authState.status && (
                                <>
                                    <Route path="/register" element={<Register />}></Route>
                                    <Route path="/login" element={<Login />}></Route>
                                </>
                            )}

                            <Route path="/" element={<AdminLayout />}>
                                {authState.role === "Admin" && (
                                    <>
                                        <Route path="/admin" element={<Admin />} />

                                        <Route path="/admin/categories" element={<AdminCategories />} />
                                        <Route path="/admin/category/create" element={<AdminCategoryCreate />} />

                                        <Route path="/admin/comments" element={<AdminComments />} />

                                        <Route path="/admin/sos" element={<AdminSoses />} />

                                        <Route path="/admin/sos-center" element={<AdminSosCenters />} />
                                        <Route path="/admin/sos-center/create" element={<AdminSosCenterCreate />} />

                                        <Route path="/admin/setting" element={<AdminSetting />} />

                                        <Route path="/admin/users" element={<AdminUsers />} />
                                        <Route path="/admin/user/create" element={<AdminUserCreate />} />

                                        <Route path="/admin/welayats" element={<AdminWelayats />} />
                                        <Route path="/admin/welayat/create" element={<AdminWelayatCreate />} />
                                    </>
                                )}
                            </Route>

                            <Route path="/" element={<SosLayout />}>
                                {authState.role === "SOS" && (
                                    <>
                                        <Route path="/sos" element={<SosCenter />} />

                                        <Route path="/sos/blogs" element={<SosCenterBlog />} />
                                        <Route path="/sos/blog/create" element={<SosCenterBlogCreate />} />

                                        <Route path="/sos/notifications" element={<SosCenterNotification />} />
                                        <Route path="/sos/notification/create" element={<SosCenterNotificationCreate />} />

                                        <Route path="/sos/soses" element={<SosCenterSos />} />

                                        <Route path="/sos/units" element={<SosCenterUnit />} />
                                        <Route path="/sos/unit/create" element={<SosCenterUnitCreate />} />
                                    </>
                                )}
                            </Route>

                            <Route path="/" element={<UnitLayout />}>
                                {authState.role === "UNIT" && (
                                    <>
                                        <Route path="/unit" element={<Unit />} />

                                        <Route path="/unit/soses" element={<UnitSos />} />
                                    </>
                                )}
                            </Route>

                            {!authState.status && (
                                <>
                                    <Route path="/admin/login" element={<AdminLogin />} />
                                    <Route path="/sos/login" element={<SosCenterLogin />} />
                                    <Route path="/unit/login" element={<UnitLogin />} />
                                </>
                            )}
                        </Routes>
                    </BrowserRouter>
                </ThemeContextProvider>
            </AuthContext.Provider>
        </>
    );
};

const HomeLayout = () => {
    return (
        <>
            <Navbar />

            <Outlet />

            <Footer />
        </>
    );
};

const AdminLayout = () => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <div className={darkMode ? "bg-dark" : "bg-main"}>
            <AdminNavbar />
            <div className="container">
                <div className="row">
                    <nav id="sidebarMenu" className="col-xl-2 col-lg-2 col-md-2 d-md-block position-fixed collapse" style={darkMode ? { backgroundColor: "#212529", zIndex: "100" } : { backgroundColor: "#edf2f9", zIndex: "100" }}>
                        <AdminSidebar />
                    </nav>

                    <main className="col-xl-9 col-lg-9 col-md-9 ms-sm-auto px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

const SosLayout = () => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <div className={darkMode ? "bg-dark" : "bg-main"}>
            <SosNavbar />
            <div className="container">
                <div className="row">
                    <nav id="sidebarMenu" className="col-xl-2 col-lg-2 col-md-2 d-md-block position-fixed collapse" style={darkMode ? { backgroundColor: "#212529", zIndex: "100" } : { backgroundColor: "#edf2f9", zIndex: "100" }}>
                        <SosSidebar />
                    </nav>

                    <main className="col-xl-9 col-lg-9 col-md-9 ms-sm-auto px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

const UnitLayout = () => {
    const { darkMode } = useContext(ThemeContext)
    return (
        <div className={darkMode ? "bg-dark" : "bg-main"}>
            <UnitNavbar />
            <div className="container">
                <div className="row">
                    <nav id="sidebarMenu" className="col-xl-2 col-lg-2 col-md-2 d-md-block position-fixed collapse" style={darkMode ? { backgroundColor: "#212529", zIndex: "100" } : { backgroundColor: "#edf2f9", zIndex: "100" }}>
                        <UnitSidebar />
                    </nav>

                    <main className="col-xl-9 col-lg-9 col-md-9 ms-sm-auto px-md-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default App;
