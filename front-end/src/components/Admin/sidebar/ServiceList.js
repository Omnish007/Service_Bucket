import React from "react";
import AdminPageServiceTabs from "../AdminPageServiceTabs";

const ServiceList = ({ service, auth }) => {
    return (
        <div>
            <AdminPageServiceTabs auth={auth} service={service} />
        </div>
    );
};

export default ServiceList;
