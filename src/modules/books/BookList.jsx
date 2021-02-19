import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    border: "1px solid #999",
  },
  table: {
    minWidth: 350,
    width: "100%",
  },
});

/**
 * This is Book list page
 *
 * @param {*} props
 */
export default function BookList(props) {
  const classes = useStyles();
  const { rows } = props;

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="books table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Author&nbsp;name</TableCell>
              <TableCell align="right" max-width="20%">
                Language
              </TableCell>
              <TableCell align="right">First&nbsp;publish&nbsp;year</TableCell>
              <TableCell align="right">Publish&nbsp;place</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="center">-</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.key}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.author_name}</TableCell>
                <TableCell align="right" max-width="20%">
                  {row.language}
                </TableCell>
                <TableCell align="right">{row.first_publish_year}</TableCell>
                <TableCell align="right">{row.publish_place}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">
                  {row.isbn && row.isbn.length > 0 && (
                    <Link to={`/books/${row.isbn[0]}`}>details</Link>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
