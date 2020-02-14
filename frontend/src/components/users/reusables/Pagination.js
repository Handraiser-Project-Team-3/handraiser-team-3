import React from "react";

const Pagination = props => {
  const { user, postPerPage, totalPost, paginate } = props;
  const userDetails = user ? user : {};
  const { account_type_id } = userDetails;

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
              <a onClick={() => paginate(num)} href="#layout" className="page-link">
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
