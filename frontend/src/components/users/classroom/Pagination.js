import React from 'react';

const Pagination = ({ postPerPage, totalPost, paginate }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-end mt-3">
                {pageNumbers.map(num => (
                    <li key={num} className={"page-item"}>
                        <a onClick={() => paginate(num)} href="#" className="page-link">
                            {num}
                        </a>
                    </li>
                ))}
            </ul>

        </nav>
    )
}

export default Pagination;