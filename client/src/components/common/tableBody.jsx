import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  createKey = (item, column) => {
    return item._id + (column.label || column.key);
  };

  renderCell = (item, column) => {
    if (column.content) return column.content(item);
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              <td
                style={{ textAlign: "center" }}
                key={this.createKey(item, column)}
                className={"align-middle col-1"}
              >
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
