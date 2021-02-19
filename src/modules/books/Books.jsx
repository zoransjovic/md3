import React, { Component } from "react";
import PropTypes from "prop-types";

import { bookService } from "../../services/book.service";
import Search from "../../widgets/search/Search";
import PageNavigation from "../../widgets/pagination/PageNavigation";
import BookList from "./BookList";

/**
 * This is Book container component
 */
export class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      query: "",
      error: null,
      message: "",
      totalResults: 0,
      totalPages: 0,
      currentPageNo: 0,
    };
  }

  static propTypes = {
    className: PropTypes.string,
  };

  static defaultPorps = {
    className: null,
  };

  getPageCount = (total, denominator) => {
    const divisible = 0 === total % denominator;
    const valueToBeAdded = divisible ? 0 : 1;
    return Math.floor(total / denominator) + valueToBeAdded;
  };

  getBooks = (updatedPageNo = "", input) => {
    const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : "";

    bookService
      .searchBooks(input, pageNumber)
      .then((response) => {
        const total = response.num_found;
        const totalPagesCount = this.getPageCount(total, 100);
        const resultNotFoundMsg = !response.docs.length
          ? "There are no more search results"
          : "";
        this.setState({
          items: response.docs,
          message: resultNotFoundMsg,
          totalResults: total,
          totalPages: totalPagesCount,
          currentPageNo: updatedPageNo,
        });
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  onChangeSearch = (field, value) => {
    if (!value) {
      this.setState({
        query: value,
        items: [],
        message: "",
        totalPages: 0,
        totalResults: 0,
      });
    } else if (value.length > 2) {
      this.setState({ query: value, message: "" }, () => {
        this.getBooks(1, value);
      });
    }
  };

  handlePageClick = (type) => {
    const updatePageNo =
      "prev" === type
        ? this.state.currentPageNo - 1
        : this.state.currentPageNo + 1;

    this.setState({ message: "" }, () => {
      this.getBooks(updatePageNo, this.state.query);
    });
  };

  render() {
    const { error, items, message, currentPageNo, totalPages } = this.state;
    const showPrevLink = 1 < currentPageNo;
    const showNextLink = totalPages > currentPageNo;

    return (
      <div>
        {error && <p>Error: {error}</p>}
        {message && <p className="message">{message}</p>}

        <Search onChange={this.onChangeSearch}></Search>

        <div>
          <PageNavigation
            showPrevLink={showPrevLink}
            showNextLink={showNextLink}
            handlePrevClick={() => this.handlePageClick("prev")}
            handleNextClick={() => this.handlePageClick("next")}
            currentPageNo={currentPageNo}
            totalPages={totalPages}
          />

          {items.length > 0 && <BookList rows={items} />}
        </div>
      </div>
    );
  }
}

export default Books;
