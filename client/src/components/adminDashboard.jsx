import React, { Component } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/productsService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ProductsTable from "./productsTable";
import ModalBox from "./common/modalBox";
import _ from "lodash";

class AdminDashboard extends Component {
  state = {
    products: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "name", order: "asc" },
    showModal: false,
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }

  // handleShow = () => {
  //   this.setState({ showModal: true });
  // };

  // handleClose = () => {
  //   this.setState({ showModal: false });
  // };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  };

  handleDelete = async (product) => {
    const { pageSize, currentPage } = this.state;
    try {
      await deleteProduct(product);
    } catch (err) {
      console.log(err.message);
    }
    const products = this.state.products.filter((p) => p.name !== product.name);
    if (!(products % pageSize) && currentPage > 1)
      this.setState({ products: products, currentPage: currentPage - 1 });
    else this.setState({ products });
  };

  handleUpdate = async (product) => {
    const products = [...this.state.products];
    const index = products.indexOf(product);
    products[index] = { ...products[index] };
    // IMPLEMENT UPDATE LOGIC
    try {
      await updateProduct(product);
    } catch (err) {
      console.log(err.message);
    }
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      products: allproducts,
      sortColumn,
    } = this.state;

    const sorted = _.orderBy(
      allproducts,
      [sortColumn.path],
      [sortColumn.order]
    );

    const products = paginate(sorted, currentPage, pageSize);

    return { totalCount: allproducts.length, data: products };
  };

  render() {
    const { currentPage, pageSize, products, sortColumn, showModal } = this.state;

    if (products.length === 0)
      return <p>There are no products in the database.</p>;

    const { totalCount, data: allproducts } = this.getPageData();

    return (
      <React.Fragment>
        <ModalBox
          show={showModal}
          onModal={this.handleModal}
        ></ModalBox>
        <div className="mx-5 mt-4">
          <div className="col">
            <p>Showing {totalCount} products in the database.</p>
          </div>
          <div className="col">
            <div className="d-flex flex-row-reverse">
              <button
                onClick={() => console.log("Add")}
                className="btn btn-sm btn-success mx-4"
              >
                Add
              </button>
            </div>
            <ProductsTable
              products={allproducts}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
              onSort={this.handleSort}
              sortColumn={sortColumn}
              onModal={this.handleModal}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              onPageChange={this.handlePageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AdminDashboard;
