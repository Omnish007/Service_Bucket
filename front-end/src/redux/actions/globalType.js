export const GLOBALTYPES = {
    AUTH: "AUTH",
    ALERT: "ALERT",
    SERVICE: "SERVICE",
    SUBSERVICE: "SUBSERVICE",
    ORDER: "ORDER",
    EMPLOYEE: "EMPLOYEE",
};

export const EditData = (data, id, post) => {
    const newData = data.map((item) => (item._id === id ? post : item));
    return newData;
};

export const DeleteData = (data, id) => {
    const newData = data.filter((item) => item._id !== id);
    return newData;
};
