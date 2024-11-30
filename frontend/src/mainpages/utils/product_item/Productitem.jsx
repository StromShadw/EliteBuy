import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import "./Productitem.css";
import axios from "axios";
import Loading from "../Loading/Loading";

function ProductItem({
  product,
  isAdmin,
  deleteProduct,
  callback,
  setCallback,
  products,
  setProducts,
}) {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  const [loading, setLoading] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  if (loading)
    return (
      <div className="product_card">
        <Loading />
      </div>
    );

  return (
    <div className={`product_container ${isAdmin ? "admin_view" : ""}`}>
      {isAdmin ? (
        <table className="product_table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="checkbox"
                  checked={product.checked}
                  onChange={() => handleCheck(product._id)}
                />
              </td>
              <td>
                <img src={product.images.url} alt="" className="table_image" />
              </td>
              <td>{product.title}</td>
              <td>${product.price}</td>
              <td>
                <Link id="btn_view" to={`/edit_product/${product._id}`}>
                  EDIT
                </Link>
                <Link
                  id="btn_buy"
                  to="#!"
                  onClick={() =>
                    deleteProduct(product._id, product.images.public_id)
                  }
                >
                  DELETE
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div className="product_card">
          <img src={product.images.url} alt="" />
          <div className="product_box">
            <h2>{product.title}</h2>
            <h1>${product.price}</h1>
            <p>{product.description}</p>
          </div>
          <div className="row_btn">
            <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
              BUY
            </Link>
            <Link id="btn_view" to={`/detail/${product._id}`}>
              VIEW
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
