import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useHistory } from "react-router-dom";
import copy from "clipboard-copy";
import axios from "axios";
import Switch from '@material-ui/core/Switch';
import Chip from "@material-ui/core/Chip";

// component/s
import { HandleClassModal } from "./HandleClassModal";
import ClassHead from "../reusables/ClassHead";
import Layout from "../reusables/Layout";
import { JoinClassModal } from "./JoinClassModal";
import { UserDetails, user_details } from "../reusables/UserDetails";
import { ClassViewStyle } from "../style/Styles";
import Pagination from "../reusables/Pagination";

// images
import classroom from "../../assets/images/classroom.jpg";
import student from "../../assets/images/student.png";
import edit from "../../assets/images/edit.png";
import key from "../../assets/images/key.png";

const AntSwitch = withStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    '&$checked': {
      transform: 'translateX(12px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main.dark,
        borderColor: theme.palette.primary.main.dark,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}))(Switch);

export const ClassView = props => {
  const classes = ClassViewStyle();
  const { user, headers } = props.data;
  const userDetails = user ? user : {};
  const { first_name, account_type_id, id } = userDetails;
  const [headTitle, setHeadTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("");
  const [filter, setFilter] = useState([]);
  const [classList, setClassList] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  const [classroomUsers, setClassroomUsers] = useState([]);
  const history = useHistory();
  const [classRoom, setClassRoom] = useState({
    class_name: "",
    class_description: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(8);

const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedC: true,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  const handleClickOpen = () => {
    setOpen(true);
    setAction("Save");
    setHeadTitle("Edit");
  };
  const onOpenTip = id => {
    Promise.all(
      classroomUsers
        .filter(res => {
          return res.class_id === id;
        })
        .map(res =>
          user_details(res.user_id, headers).then(res => {
            return res.data.first_name + " " + res.data.last_name;
          })
        )
    ).then(response => {
      setStudentDetails(response);
    });
  };
  // const deleteClass = classid => {
  //   axios
  //     .delete(`/api/class/${classid}`, headers)
  //     .then(() => setClassList(classList.filter(data => data.id !== classid)));
  // };

  useEffect(() => {
    account_type_id &&
      (async () => {
        try {
          const res = await axios.get("/api/class/", headers);
          if (account_type_id === 2) {
            setClassList(
              res.data.filter(data => {
                return data.user_id === id;
              })
            );
            setFilter(
              res.data.filter(data => {
                return data.user_id === id;
              })
            );
          } else {
            setClassList(
              res.data.filter(data => {
                return data.class_status === true;
              })
            );
            setFilter(
              res.data.filter(data => {
                return data.class_status === true;
              })
            );
          }
        } catch (err) {
          console.error(err);
        }
      })();

    axios
      .get(`/api/classroom-users/`, headers)
      .then(classUsers => {
        setClassroomUsers(classUsers.data);
      })
      .catch(e => console.log(e));

    // eslint-disable-next-line
  }, [account_type_id]);

  // Get current classlist
  const indexOfLastList = currentPage * postPerPage;
  const indexOfFirstList = indexOfLastList - postPerPage;
  const currentList = classList.slice(indexOfFirstList, indexOfLastList);
  // Change page
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <Layout first_name={first_name}>
      <ClassHead
        account_type_id={account_type_id}
        setOpen={setOpen}
        setAction={setAction}
        setHeadTitle={setHeadTitle}
        filter={filter}
        setClassList={setClassList}
      />
      <Grid container direction="row" alignItems="center" spacing={3}>
        {classList.length ? (
          currentList
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map((data, i) => (
              <Grid key={i} item lg={3} md={4} sm={6} xs={12}>
                <Card elevation={7}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image={classroom}
                      title={data.class_name}
                    >{account_type_id === 2 ? 
                      <Grid container
                      direction="row"
                      justify="flex-end"
                      alignItems="flex-start">
                    <Grid item style={{margin: "5px"}}>
                      <AntSwitch
                        checked={state.checkedC}
                        onChange={handleChange('checkedC')}
                        value="checkedC"
                      />
                    </Grid>
                    </Grid>
                    : ""}
                   </CardMedia>
                    <CardContent>
                      <Typography gutterBottom variant="h5" >
                        {data.class_name}
                      </Typography>
                      <Tooltip
                        title={
                          data.class_description.length > 45 ? (
                            <Typography style={{ fontSize: 12 }}>
                              {data.class_description.substring(0)}
                            </Typography>
                          ) : (
                            ""
                          )
                        }
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {data.class_description.length > 45
                            ? data.class_description.substring(0, 42) + "..."
                            : data.class_description}
                        </Typography>
                      </Tooltip>
                    </CardContent>
                    <CardContent>
                      <Typography
                        gutterBottom
                        component="div"
                        variant="inherit"
                      >
                        {account_type_id === 2 ? (
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            align="center"
                            spacing={5}
                          >
                            <Grid item xs={6}>
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="space-between"
                              >
                                <Grid item lg={2} xs={2}>
                                  <img
                                    src={student}
                                    alt="man"
                                    style={{ width: "30px" }}
                                  />
                                </Grid>
                                <Tooltip
                                  onOpen={() => onOpenTip(data.id)}
                                  title={
                                    studentDetails.length !== 0
                                      ? studentDetails.map(res => (
                                          <Typography
                                            style={{ fontSize: 12 }}
                                            key={res.id}
                                          >
                                            {res}
                                          </Typography>
                                        ))
                                      : ""
                                  }
                                >
                                  <Grid item lg={10} xs={10}>
                                    <Grid
                                      container
                                      direction="column"
                                      alignItems="flex-start"
                                      justify="space-between"
                                    >
                                      <Grid item lg={12} xs={12}>
                                        <Typography
                                          gutterBottom
                                          component="div"
                                          variant="caption"
                                        >
                                          Students:
                                        </Typography>
                                      </Grid>
                                      <Grid item lg={12} xs={12}>
                                        <b>
                                        <Chip
				                                    variant="outlined"
				                                    size="small"
				                                    label={classroomUsers &&
                                              classroomUsers.filter(res => {
                                                return res.class_id === data.id;
                                              }).length}
				                                    style={{ fontSize: "14px" }}
			                                    />
                                          
                                        </b>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Tooltip>
                              </Grid>
                            </Grid>
                            
                            <Grid item xs={6}>
                              <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="space-between"
                                spacing={3}
                              >
                                <Grid item xs={3}>
                                  <img
                                    src={key}
                                    alt="class-code"
                                    style={{ width: "30px" }}
                                  />
                                </Grid>

                                <Grid item xs={9}>
                                  <Grid
                                    container
                                    direction="column"
                                    alignItems="flex-start"
                                    justify="space-between"
                                  >
                                    <Grid item lg={12} xs={12}>
                                      <Typography
                                        gutterBottom
                                        component="div"
                                        variant="caption"
                                      >
                                        Class Code:
                                      </Typography>
                                    </Grid>
                                    <Grid item lg={12} xs={12}>
                                      <Tooltip title="Click to copy code">
                                        <b
                                          onClick={() => copy(data.class_code)}
                                        >
                                          <Chip
				                                    variant="outlined"
				                                    size="small"
				                                    label={data.class_code}
				                                    className={classes.codeStyle}
			                                    />
                                          
                                        </b>
                                      </Tooltip>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        ) : (
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              justify="space-between"
                            >
                              <Grid item xs={3}>
                                <UserDetails
                                  id={data.user_id}
                                  headers={headers}
                                  action="img"
                                />
                              </Grid>

                              <Grid item xs={9}>
                                <Grid
                                  container
                                  direction="column"
                                  alignItems="flex-start"
                                  justify="space-between"
                                >
                                  <Grid item lg={12} xs={12}>
                                    <Typography
                                      gutterBottom
                                      component="div"
                                      variant="caption"
                                    >
                                      Mentor's Name:
                                  </Typography>
                                </Grid>
                                <Grid item lg={12} xs={12}>
                                  <b>
                                    <UserDetails
                                      id={data.user_id}
                                      headers={headers}
                                      action="name"
                                    />
                                  </b>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions style={account_type_id === 2 ? { background: "#ff6f61" } : {background: "#ababfa"}}>
                    {account_type_id === 2 ? (
                      <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justify="space-between"
                      >
                        <Grid item lg={9} md={10} sm={9} xs={9}>
                          <Button
                            onClick={() =>
                              history.push(`/classroom/${data.id}`)
                            }
                            size="small"
                            style={{ color: "white", outline: "none" }}
                          >
                            Enter Class
                          </Button>
                          {/* <Button onClick={() => deleteClass(data.id)}>
                            delete
                          </Button> */}
                        </Grid>
                        
                        <Grid item lg={1}>
                          <Grid container direction="row" alignItems="center">
                            <Tooltip title="Edit Class">
                              <img
                                src={edit}
                                alt="edit"
                                className={classes.icons}
                                style={{ marginRight: "10px" }}
                                onClick={() => {
                                  handleClickOpen();
                                  setClassRoom({
                                    id: data.id,
                                    class_name: data.class_name,
                                    class_description: data.class_description
                                  });
                                }}
                              />
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container direction="column" alignItems="center">
                        <JoinClassModal
                          classroomUsers={classroomUsers}
                          classId={data.id}
                          className={data.class_name}
                          codeClass={data.class_code}
                          user={user}
                          headers={headers}
                        />
                      </Grid>
                    )}
                  </CardActions>
                </Card>
              </Grid >
              
            ))
        ) : (
          <div className={classes.margin}>
            <span className={classes.noClasses}>No added classes yet</span>
            <div className="spinner">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
          </div>
        )}
      </Grid>
      <Pagination
        user={user}
        userDetails={userDetails}
        headers={headers}
        postPerPage={postPerPage}
        totalPost={classList.length}
        paginate={paginate}
      />
      <HandleClassModal
        open={open}
        setOpen={setOpen}
        action={action}
        headTitle={headTitle}
        setClassRoom={setClassRoom}
        classRoom={classRoom}
        headers={headers}
        userId={id}
        setClassList={setClassList}
        classList={classList}
        account_type_id={account_type_id}
      />
      <Pagination
        postPerPage={postPerPage}
        totalPost={classList.length}
        paginate={paginate}
      />
    </Layout>
  );
};
