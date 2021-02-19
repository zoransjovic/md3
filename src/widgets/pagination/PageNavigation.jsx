import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "60px",
  },
  table: {
    minWidth: 350,
    maxWidth: 400,
  },
  pagging: {
    paddingRight: "20px",
    marginTop: "5px",
  },
});

/**
 * This is Page navigation component
 */
export default (props) => {
  const classes = useStyles();
  const {
    showPrevLink,
    showNextLink,
    handlePrevClick,
    handleNextClick,
    currentPageNo,
    totalPages,
  } = props;
  return (
    <div className={classes.root}>
      <div className={classes.pagging}>
        <span>
          Page number: {currentPageNo} of {totalPages}
        </span>
      </div>
      <a
        href="#"
        className={`nav-link 
					${showPrevLink ? "show" : "hide"}
					`}
        onClick={handlePrevClick}
      >
        Prev
      </a>
      <a
        href="#"
        className={`nav-link 
					${showNextLink ? "show" : "hide"}
					
					`}
        onClick={handleNextClick}
      >
        Next
      </a>
    </div>
  );
};
