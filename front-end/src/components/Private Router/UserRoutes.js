import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import NotFound from "../NotFound";

const UserRouter = ({ auth }) => {
    return auth.user && auth.user.role !== "1" ? (
        <Outlet />
    ) : (
        <Navigate to="/" />
    );
};

export default UserRouter;
