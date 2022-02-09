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
    editedProduct: { name: "", price: "", description: "", imageURL: "" },
    modalLabel: "",
    modalSubmit: "",
  };

  async componentDidMount() {
    const { data: products } = await getProducts();
    this.setState({ products });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleModal = (product, label, onSubmit) => {
    this.setState({
      showModal: !this.state.showModal,
      editedProduct: product,
      modalLabel: label,
      modalSubmit: onSubmit,
    });
  };

  handleDelete = (product) => {
    const { products, pageSize, currentPage } = this.state;

    deleteProduct(product)
      .then(() => getProducts())
      .then(({ data: products }) => this.setState({ products }))
      .then(() => {
        if (products.length % pageSize && currentPage > 1) {
          this.setState({ currentPage: currentPage - 1 });
        }
      })
      .catch((err) => console.log(err.message));
  };

  handleUpdate = (product) => {
    updateProduct(product)
      .then(() => getProducts())
      .then(({ data: products }) =>
        this.setState({ showModal: false, products })
      )
      .catch((err) => console.log(err.message));
  };

  handleAdd = (product) => {
    addProduct(product)
      .then(() => getProducts())
      .then(({ data: products }) =>
        this.setState({ showModal: false, products })
      )
      .catch((err) => console.log(err.message));
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
    const {
      currentPage,
      pageSize,
      sortColumn,
      showModal,
      modalLabel: currentAction,
      editedProduct,
      modalSubmit,
    } = this.state;

    const { totalCount, data: allproducts } = this.getPageData();

    return (
      <React.Fragment>
        <ModalBox
          show={showModal}
          onModal={this.handleModal}
          label={currentAction}
          currentEdit={editedProduct}
          onSubmit={modalSubmit}
        ></ModalBox>
        <div className="mx-5 mt-4">
          <div className="col">
            <div className="d-flex flex-row-reverse">
              <button
                onClick={() =>
                  this.handleModal(
                    { name: "", price: "", description: "", imageURL: "" },
                    "Add Product",
                    this.handleAdd
                  )
                }
                className="btn btn-sm btn-success mx-4"
              >
                Add
              </button>
            </div>
            <ProductsTable
              products={allproducts}
              onDelete={this.handleDelete}
              onUpdate={this.handleUpdate}
              onAdd={this.handleAdd}
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
