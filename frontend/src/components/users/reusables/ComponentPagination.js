import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Icon, Pagination } from "semantic-ui-react";

const Paginations = props => {
  const { totalPost, setActivePage, activePage, itemPerPage } = props;
  const handlePageChange = (e, pageInfo) => {
    setActivePage(pageInfo.activePage);
  };

  return (
    <Pagination
      activePage={activePage}
      ellipsisItem={{
        content: <Icon name="ellipsis horizontal" />,
        icon: true
      }}
      firstItem={{ content: <Icon name="angle double left" />, icon: true }}
      lastItem={{ content: <Icon name="angle double right" />, icon: true }}
      prevItem={{ content: <Icon name="angle left" />, icon: true }}
      nextItem={{ content: <Icon name="angle right" />, icon: true }}
      pointing
      secondary
      totalPages={Math.ceil(totalPost / itemPerPage)}
      onPageChange={handlePageChange}
    />
  );
};

export default Paginations;
