import React, { useEffect } from "react";
// import { Alert } from "@material-ui/lab";
// import Snackbar from "@material-ui/core/Snackbar";
// import AdminTable from "./AdminTable";
import BackGround from "../assets/images/bg.jpg";

const divStyle = {
  width: "90%",
  margin: "70px auto 0px auto",
  height: "92vh",
  display: "flex",
  flexDirection: "column"
  // justifyContent: "center"
};
const divAdminHeader = {
  backgroundImage: `url(${BackGround})`,
  width: "100%",
  height: "80px",
  backgroundRepeat: "no-repeat",
  marginTop: "60px",
  fontSize: "24px"
};

export const Admin = props => {
  const [state, setState] = React.useState(false);
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  // const { metaData, setMetaData } = props.data;

  useEffect(() => {
    setState(true);
    setTimeout(() => {
      setState(false);
    }, 5000);
  }, []);

  return (
    <React.Fragment>
      {/* <div style={divAdminHeader}>
          <Snackbar
            open={state}
            onClose={handleClose}
            message="Welcome Admin"
            anchorOrigin={{
              vertical: "top",
              horizontal: "left"
            }}
          >
            <Alert
              style={{ marginTop: "50px", width: "350px", fontSize: "18px" }}
              severity="success"
              color="info"
            >
              Welcome Admin
            </Alert>
          </Snackbar>
        </div>
        <div style={divStyle}>
          <AdminTable />
        </div> */}
    </React.Fragment>
  );
};
