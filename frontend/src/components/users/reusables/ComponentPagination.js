import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon, Pagination } from "semantic-ui-react";

const Paginations = props => {
  const { account_type_id, totalPost, setActivePage, activePage } = props;

  const handlePageChange = pageNumber => {
    setActivePage(pageNumber);
  };
  console.log(account_type_id);
  return (
    <>
      <Pagination
        defaultActivePage={activePage}
        ellipsisItem={{
          content: <Icon name="ellipsis horizontal" />,
          icon: true
        }}
        firstItem={{ content: <Icon name="angle double left" />, icon: true }}
        lastItem={{ content: <Icon name="angle double right" />, icon: true }}
        prevItem={{ content: <Icon name="angle left" />, icon: true }}
        nextItem={{ content: <Icon name="angle right" />, icon: true }}
        totalPages={totalPost / 8}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
      />
    </>
  );
};

export default Paginations;
