import React from "react";
import { Link } from "react-router-dom";

const style = {
    cursor: "pointer",
};

const Pagination = ({ orderPerPage, totalOrder, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalOrder / orderPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="adminPageOrderCardPaginationContainer">
            <ul className="pagination">
                {pageNumbers.map((num) => (
                    <li key={num} className="page-item">
                        <Link
                            style={style}
                            onClick={() => paginate(num)}
                            className="page-link"
                            to={`${num}`}
                        >
                            {num}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Pagination;
