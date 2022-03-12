import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import NotFound from "../NotFound";

const PrivateRouter = ({ auth }) => {
    return auth?.user?.role === "1" ? <Outlet /> : <NotFound />;
};

export default PrivateRouter;
