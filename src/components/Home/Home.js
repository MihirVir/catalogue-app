import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux/es/exports";
import { useSelector } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { HiX } from "react-icons/hi";
import { Pie } from "react-chartjs-2";
import { registerables, Chart, ArcElement, Tooltip, Legend } from "chart.js";
import "./home.css";
import { list } from "../../slices/productSlice";
Chart.register(...registerables, ArcElement, Tooltip, Legend);
const Home = () => {
  const user = useSelector((state) => state.user.user);
  const opt = useSelector((state) => state.category.category.category);
  const [isReadMore, setIsReadMore] = useState(false);
  const [id, setId] = useState(0);
  const search = useSelector((state) => state.search.search);
  const products = useSelector((state) => state.product.products.products);
  const [filteredResult, setFilterResult] = useState([]);
  const navigate = useNavigate();
  const [openPieChart, setOpenPieChart] = useState(false);
  const [total, setTotal] = useState({});

  const pieData = {
    labels: total !== null && Object?.keys(total)?.map((item) => item),
    datasets: [
      {
        data: Object?.values(total)?.map((item) => item),
      },
    ],
  };
  const options = {};
  const filterByCategory = () => {
    try {
      if (products !== null || products !== undefined) {
        const filterByCategory = products?.filter(
          (product) => product.category === opt
        );

        setFilterResult(filterByCategory);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filterBySearchbar = () => {
    try {
      if (products !== null || products !== undefined) {
        const res = products?.filter((item) =>
          item.title.toLowerCase().includes(search.search.toLowerCase())
        );
        setFilterResult(res);
      }
    } catch (err) {
      console.log(err);
    }
  };
  // read mode
  const handleReadMode = (idt) => {
    setId(idt);
    setIsReadMore((prev) => !prev);
  };

  useEffect(() => {
    if (user === null) {
      navigate("/");
    }
    if (opt === "") {
      setFilterResult([]);
    }
    filterByCategory();
    filterBySearchbar();

    if (products !== null) {
      const counts = products?.reduce((counts, product) => {
        const cat = product.category;
        counts[cat] = (counts[cat] || 0) + 1;
        return counts;
      }, {});
      setTotal(counts);
    }
  }, [opt, search]);

  return (
    <>
      <section className="product-list-section">
        <div className="product-list-section-container">
          <h1>List of Products</h1>
          <div className="product-list-card-container">
            {filteredResult.length > 0 ? (
              <>
                {filteredResult?.map((product) => {
                  return (
                    <>
                      <div
                        className="product-list-card-wrapper"
                        key={product.id}
                      >
                        <img
                          className="product-image"
                          src={`${product.image}`}
                          alt=""
                        />
                        <p className="product-title">{product.title}</p>
                        <span
                          style={{
                            fontSize: ".6rem",
                          }}
                        >
                          {isReadMore && id === product.id
                            ? product.description
                            : product.description.substring(0, 150)}
                        </span>
                        <span
                          style={{
                            color: "blue",
                            cursor: "pointer",
                          }}
                          onClick={() => handleReadMode(product.id)}
                        >
                          {" "}
                          {isReadMore && id === product.id
                            ? "show less"
                            : "show more"}
                        </span>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <>
                {products?.map((product) => {
                  return (
                    <>
                      <div
                        className="product-list-card-wrapper"
                        key={product.id}
                      >
                        <img
                          className="product-image"
                          src={`${product.image}`}
                          alt=""
                        />
                        <p className="product-title">{product.title}</p>
                        <span
                          style={{
                            fontSize: ".6rem",
                          }}
                        >
                          {isReadMore && id === product.id
                            ? product.description
                            : product.description.substring(0, 150)}
                        </span>
                        <span
                          style={{
                            color: "blue",
                            cursor: "pointer",
                          }}
                          onClick={() => handleReadMode(product.id)}
                        >
                          {" "}
                          {isReadMore && id === product.id
                            ? "show less"
                            : "show more"}
                        </span>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div
          className="floating-analysing-btn"
          onClick={() => setOpenPieChart((prev) => !prev)}
        >
          <p>Analyse</p>
        </div>
        {openPieChart && (
          <>
            <div className="pie-chart-container">
              <Pie data={pieData} options={options} />
              <HiX
                onClick={() => setOpenPieChart(false)}
                style={{
                  position: "absolute",
                  top: "4%",
                  right: "4%",
                }}
              />
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Home;
