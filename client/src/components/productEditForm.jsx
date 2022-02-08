import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class ProductEditForm extends Form {
  state = {
    data: { ...this.props.data },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    price: Joi.number().required().label("Price"),
    description: Joi.string().required().label("Description"),
    imageURL: Joi.string().required().label("Image URL"),
    _id: Joi.string().label("ID"),
    __v: Joi.number().label("Version"),
  };

  doSubmit = (product) => {
    this.props.onSubmit(product);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("price", "Price ($)")}
          {this.renderInput("description", "Description")}
          {this.renderInput("imageURL", "Image URL")}
          {this.renderButton("Save Changes")}
        </form>
      </div>
    );
  }
}

export default ProductEditForm;
