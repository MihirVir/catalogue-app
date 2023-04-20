import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { HiDotsVertical } from "react-icons/hi";
import "./nav.css";
import { options } from "../../slices/categorySlice";
import { list } from "../../slices/productSlice";
import { searcher } from "../../slices/searchSlice";
const Nav = () => {
  const user = useSelector((state) => state.user.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();

  const handleOptionPicker = (e) => {
    dispatch(
      options({
        category: e.target.value,
      })
    );
  };
  const fetchProducts = async () => {
    try {
      const url = `https://fakestoreapi.com/products`;
      const res = await axios.get(url);
      dispatch(
        list({
          products: res.data,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };
  const fetchCategories = async () => {
    try {
      const url = `https://fakestoreapi.com/products/categories`;
      const res = await axios.get(url);
      setCategories(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  return (
    <>
      <header className="header">
        <nav className="nav-bar">
          <h2 className="app-title">Catalogue Management Application</h2>
          <ul className="nav-links">
            <li>
              <select className="selector" onChange={handleOptionPicker}>
                <option value="">Select category</option>
                {categories.map((item, id) => {
                  return (
                    <>
                      <option value={`${item}`} key={id}>
                        {item}
                      </option>
                    </>
                  );
                })}
              </select>
            </li>
            <li>
              <input
                className="header-search-field"
                type="text"
                placeholder="search products"
                onChange={(e) => {
                  dispatch(
                    searcher({
                      search: e.target.value,
                    })
                  );
                }}
              />
            </li>
            <li>
              <HiDotsVertical onClick={() => setIsMenuOpen((prev) => !prev)} />
            </li>
          </ul>
        </nav>
      </header>
      {isMenuOpen && (
        <>
          <div
            className={isMenuOpen ? "menu-bar-open active" : "menu-bar-open"}
          >
            <ul className="user-details">
              <li className="user-details-li">{user?.username}</li>
              <li className="user-details-li">{user?.email}</li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Nav;
