// Import useState and useEffect
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "./ProductDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../redux/actions/wishlist";
import { addTocart } from "../redux/actions/cart";
import { toast } from "react-toastify";
import { backendURL } from "../config";
import Ratings from "./Products/Ratings";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track user's login status
  const dispatch = useDispatch();

  // console.log("HEREEEEEE", window.localStorage.getItem("email"))

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!isLoggedIn); // Convert to boolean
    const userEmail = localStorage.getItem("email");
    // console.log('User Email:', userEmail);
  }, []);

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i.id === product.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  const addToCartHandler = async (id) => {
    if (!isLoggedIn) {
      // If user is not logged in, show prompt to login
      toast.error("Please log in to add items to your cart.");
      return; // Prevent adding to cart if user is not logged in
    }

    const isItemExists = cart && cart.find((i) => i.id === id);
    if (isItemExists) {
      toast.error("Item already in cart!");
    } else {
      if (product.stock < 1) {
        toast.error("Product stock limited!");
      } else {
        const cartData = { ...product };
        let email = window.localStorage.getItem("email");
        console.log("IDHRRR", cartData);
        try {
          // Construct the URL for adding to cart
          const addToCartURL = `${backendURL}/add-to-cart`;

          // Send cart item data to the backend
          const response = await fetch(addToCartURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              // Include any necessary authentication tokens or headers here
            },
            body: JSON.stringify({ item: cartData, email }),
          });

          // Check if request was successful
          if (response.ok) {
            // Dispatch action to add item to Redux store
            dispatch(addTocart(cartData));

            toast.success("Item added to cart successfully!");
          } else {
            // Handle error response from backend
            const errorMessage = await response.text();
            toast.error(`Error: ${errorMessage}`);
          }
        } catch (error) {
          // Handle network errors or exceptions
          console.error("Error adding to cart:", error);
          toast.error("Error adding to cart. Please try again later.");
        }
      }
    }
  };

  return (
    <>
      <div className="w-[230px] h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer ">
        <div className="flex justify-end"></div>
        <div className="transition-transform duration-300 transform hover:scale-105">
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image_urls[0]}
              className="w-full h-[170px] object-cover"
              alt=""
            />
          </Link>
          <Link to="/">
            <h5 className={`${styles.shop_name}`}>{product.vendors.name}</h5>
          </Link>
          <Link to={`/product/${product.id}`}>
            <h4 className="pb-2 font-[500]">
              {product.name.length > 40
                ? product.name.slice(0, 40) + "..."
                : product.name}
            </h4>

            <div className="flex">
              <Ratings rating={product?.ratings} />
            </div>
            <div className="flex w-full " style={{ marginTop: "20px" }}>
              <div className="flex w-full" style={{ marginTop: "30px" }}>
                <h5 className={`${styles.productDiscountPrice} `}>
                  {product.price === 0 ? product.price : product.discount_price}
                  $
                </h5>
                <h4 className={`${styles.price} pr-7`}>
                  {product.price ? product.price + " $" : null}
                </h4>

                <span className="font-[400] text-[17px] text-[#68d284] ">
                  {product.unit_sold} sold
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* side options */}

        <div>
          {click ? (
            <AiFillHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => removeFromWishlistHandler(product)}
              color={click ? "red" : "#333"}
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={22}
              className="cursor-pointer absolute right-2 top-5"
              onClick={() => addToWishlistHandler(product)}
              color={click ? "red" : "#333"}
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={22}
            className="cursor-pointer absolute right-2 top-14"
            onClick={() => setOpen(!open)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={25}
            className="cursor-pointer absolute right-2 top-24"
            onClick={() => addToCartHandler(product.id)}
            color="#444"
            title="Add to Cart"
          />
          {open ? (
            <ProductDetailsCard
              setOpen={setOpen}
              product={product}
              // addToCart={addToCart}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProductCard;
