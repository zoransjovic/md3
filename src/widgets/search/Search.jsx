import { PureComponent } from "react";
import TextField from "@material-ui/core/TextField";

/**
 * This is search component
 */
export class Search extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleInputChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    this.props.onChange(fieldName, fieldValue);
  };

  render() {
    return (
      <div className="search-widget">
        <TextField
          autoFocus
          id="outlined-filter-id"
          margin="dense"
          label="Search"
          name="filter"
          helperText="Type min 3 chars"
          placeholder={"Search book..."}
          variant="outlined"
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Search;
