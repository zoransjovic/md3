import { Component } from "react";

import { bookService } from "../../services/book.service";
import config from "../../config/config";

/**
 * This is Book details page
 */
export default class BookDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: null,
      author: null,
      coverImg: "",
      error: null,
    };
  }

  componentDidMount() {
    this.getBook(this.props.match.params.isbn);
  }

  /**
   * Serach book
   *
   * @param {string} input
   */
  getBook = (input) => {
    bookService
      .bookDetails(input)
      .then((response) => {
        this.setState({ item: response });

        if (response.authors.length > 0) {
          bookService.getAuthor(response.authors[0].key).then((authorRes) => {
            this.setState({ author: authorRes });
          });
        }
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    const { item, author } = this.state;

    return (
      <div>
        <h2>Book details</h2>
        <img
          src={`${config.apiCoverImgUrl}/b/id/${
            item !== null && item.covers
          }-M.jpg`}
          alt="cover"
        />
        <table className="details-table">
          <tr>
            <td>Title:</td>
            <td>
              <strong>{item !== null && item.title}</strong>
            </td>
          </tr>
          <tr>
            <td>Author:</td>
            <td>
              <strong>{author !== null && author.name}</strong>
            </td>
          </tr>
          <tr>
            <td>Publishers:</td>
            <td>
              <strong>{item !== null && item.publishers}</strong>
            </td>
          </tr>
          <tr>
            <td>Publish date:</td>
            <td>
              <strong>{item !== null && item.publish_date}</strong>
            </td>
          </tr>
          <tr>
            <td>ISBN 10:</td>
            <td>
              <strong>{item !== null && item.isbn_10}</strong>
            </td>
          </tr>
          <tr>
            <td>ISBN 13:</td>
            <td>
              <strong>{item !== null && item.isbn_13}</strong>
            </td>
          </tr>
          <tr>
            <td>Number of pages:</td>
            <td>
              <strong>{item !== null && item.number_of_pages}</strong>
            </td>
          </tr>
          <tr>
            <td>Revision:</td>
            <td>
              <strong>{item !== null && item.revision}</strong>
            </td>
          </tr>
          <tr>
            <td>Latest revision:</td>
            <td>
              <strong>{item !== null && item.latest_revision}</strong>
            </td>
          </tr>
          <tr>
            <td>Created:</td>
            <td>
              <strong>
                {item !== null &&
                  item.created &&
                  new Date(item.created.value).toLocaleDateString()}
              </strong>
            </td>
          </tr>
        </table>
      </div>
    );
  }
}
