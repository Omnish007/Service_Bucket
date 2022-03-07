import AdminPendingServiceCard from "../AdminPendingServiceCard";

const OrderCards = ({ order }) => {
    return (
        <>
            {order.length > 0 &&
                order.map((ele) => <AdminPendingServiceCard ele={ele} />)}
        </>
    );
};

export default OrderCards;
