import React from "react";

const Pagination = props => {
  const { account_type_id, postPerPage, totalPost, setCurrentPage } = props;
  const paginate = pageNumber => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      {account_type_id !== 1 ? (
        <ul className="pagination justify-content-center mt-3">
          {pageNumbers.map(num => (
            <li key={num} className={"page-item"}>
              <a onClick={() => paginate(num)} href="#" className="page-link">
                {num}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        {}
      )}
    </nav>
  );
};

export default Pagination;
