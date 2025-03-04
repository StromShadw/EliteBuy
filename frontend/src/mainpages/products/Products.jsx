import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Loading from "../utils/Loading/Loading";
import ProductItem from "../utils/product_item/Productitem";
import "./Product.css";
import axios from "axios";
import Filters from "../utils/product_item/Filter";
import LoadMore from "../utils/product_item/LoadMore";

function Products() {
    const state = useContext(GlobalState);
    const [products, setProducts] = state.productsAPI.products;
    const [isAdmin] = state.userAPI.isAdmin;
    const addCart = state.userAPI.addCart;
    const [callback, setCallback] = state.productsAPI.callback;
    const [isChecked, setIsChecked] = useState(false);
    const [token] = state.token;
    const [loading, setLoading] = useState(false);

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

    const deleteProduct = async (id, public_id) => {
        try {
            setLoading(true);
            const destroyImg = axios.post(
                `${BASE_URL}/api/destroy`,
                { public_id: public_id },
                {
                    headers: { Authorization: token },
                }
            );
            const deleteProdukt = axios.delete(`${BASE_URL}/api/products/${id}`, {
                headers: { Authorization: token },
            });
            await destroyImg;
            await deleteProdukt;
            setLoading(false);
            setCallback(!callback);
        } catch (err) {
            alert(err.response.data.msg);
        }
    };

    const checkAll = () => {
        products.forEach((product) => {
            product.checked = !isChecked;
        });
        setProducts([...products]);
        setIsChecked(!isChecked);
    };

    const deleteAll = () => {
        products.forEach((product) => {
            if (product.checked) deleteProduct(product._id, product.images.public_id);
        });
    };

    return (
        <>
        <Filters/>
            {isAdmin && (
                <div className="delete-all" style={{ textAlign: "right", margin: "20px" }}>
                    <span
                        style={{
                            textTransform: "uppercase",
                            color: "blue",
                            letterSpacing: "1.3px",
                        }}
                    >
                        Select all
                    </span>
                    <input
                        style={{
                            height: "25px",
                            width: "25px",
                            transform: "translateX(5px)",
                            margin: "0 15px",
                        }}
                        type="checkbox"
                        checked={isChecked}
                        onChange={checkAll}
                    />
                    <button
                        onClick={deleteAll}
                        style={{
                            border: "1px solid crimson",
                            padding: "10px 25px",
                            color: "crimson",
                            textTransform: "uppercase",
                        }}
                    >
                        Delete All
                    </button>
                </div>
            )}
            <div className={`products ${isAdmin ? "admin" : "user"}`}>
                {products.map((product) => (
                    <ProductItem
                        key={product._id}
                        product={product}
                        setProducts={setProducts}
                        isAdmin={isAdmin}
                        callback={callback}
                        setCallback={setCallback}
                        deleteProduct={deleteProduct}
                        products={products}
                    />
                ))}
            </div>
            <LoadMore />
            {products.length === 0 && <Loading />}
        </>
    );
}

export default Products;
