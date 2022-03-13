import React from "react";
import { Outlet } from "react-router-dom";
import NotFound from "../NotFound";

const AdminRouter = ({ auth }) => {
    return auth?.user?.role === "1" ? <Outlet /> : <NotFound />;
};

export default AdminRouter;
