import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import styles from "../styles/styles";
import ProductCard from "./ProductCard";
import { solarProducts } from "../static/data";
import { useSelector } from "react-redux";

const BestProduct = () => {
  const { products } = useSelector((state) => state.data);
  const [bestProducts, setBestProducts] = useState(null);

  useEffect(() => {
    const data = [...products];
    data.sort((a, b) => b.unit_sold - a.unit_sold);
    const topfive = data.slice(0, 5);
    setBestProducts(topfive);
  }, [products]);

  return (
    <div>
      <div className={`${styles.section}`}>
        <div
          className="text-3xl font-bold mb-4 text-center"
          style={{ textShadow: "2px 2px 5px orange", marginTop: "20px" }}
        >
          <h1>Best Products</h1>
        </div>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
          {/* {bestProducts ? 
            bestProducts.length === 0 ? (
            ) :
            <>
            (
              data.map((i, index) => <ProductCard data={i} key={index} />
              )}
            </>
            <h1>...Loading</h1>
            <h1>No Products</h1>
          ) : (
          )} */}
          {bestProducts ? (
            bestProducts.length > 0 ? (
              <>
                {bestProducts.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </>
            ) : (
              <h1>No Products</h1>
            )
          ) : (
            <h1>...Loading</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default BestProduct;
