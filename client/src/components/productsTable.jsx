import React from "react";
import Table from "./common/table";

class ProductsTable extends React.Component {
  columns = [
    {
      label: "Name",
      path: "name",
    },
    {
      label: "Price",
      path: "price",
    },
    {
      label: "Options",
      key: "options",
      content: (product) => (
        <div>
          <button
            onClick={() => this.props.onUpdate(product)}
            className="btn btn-sm btn-primary mx-1"
          >
            Edit
          </button>
          <button
            onClick={() => this.props.onDelete(product)}
            className="btn btn-sm btn-danger mx-1"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  render() {
    const { products, onSort, sortColumn } = this.props;

    return (
      <Table
        data={products}
        columns={this.columns}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default ProductsTable;
