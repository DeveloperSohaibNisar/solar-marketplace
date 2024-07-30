import React, { useState, useEffect } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link } from "react-router-dom";
import styles from "../styles/styles";
import {
  AiOutlineMessage,
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../redux/actions/cart";
import { toast } from "react-toastify";
import { removeFromWishlist, addToWishlist } from "../redux/actions/wishlist";
import { backendURL } from "../config";

const ProductDetailsCard = ({ setOpen, product }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState();
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track user's login status
  const dispatch = useDispatch();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(!!isLoggedIn); // Convert to boolean
  }, []);

  const handleMessageSubmit = () => {};

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
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

  return (
    <div className="bg-[#fff]">
      {product ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={28}
              className="absolute right-3 top-3 z-50"
              onClick={() => setOpen(false)}
            />
            <div className="block w-full 800px:flex  ">
              <div style={{ paddingLeft: "5px" }}>
                {click ? (
                  <AiFillHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => removeFromWishlistHandler(product)}
                    color={click ? "red" : "#333"}
                    title="Remove from wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={30}
                    className="cursor-pointer"
                    onClick={() => addToWishlistHandler(product)}
                    color={click ? "red" : "#333"}
                    title="Add to wishlist"
                  />
                )}
              </div>
              <div className="w-full 800px:w-[50%]  ">
                <img
                  src={`${product.image_urls[0] && product.image_urls[0]}`}
                  alt=""
                />

                <div className="flex items-center">
                  {/* <img
                    src={product.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  /> */}
                  <div>
                    <h3 className={`${styles.shop_name} `}>
                      {product.vendors.name}
                    </h3>
                    {/* <h5 className=" text-[15px]">
                      {product.vendors.ratings} Ratings
                    </h5> */}
                  </div>
                </div>
                <div>
                  <div
                    className={`${styles.button} bg-[#000] rounded-[4px] h-11 `}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                  <h5 className="text-[16px] text-[red] mt-5 ">
                    ({product.unit_sold}) Sold Out
                  </h5>
                </div>
              </div>

              <div className="w-full 800px:w-[50%] pt-5 pl-[5px] ">
                <h1 className={`${styles.productTitle} text-[25px] pb-4`}>
                  {product.name}
                </h1>
                <span className="font-bold text-[17px] text-[#333] font-Roboto ">
                  Description
                </span>
                <p>{product.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {product.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {product.price ? product.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={decrementCount}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[9px]">
                      {count}
                    </span>
                    <button
                      className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                      onClick={incrementCount}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                </div>

                <div
                  className={`${styles.button} mt-10 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(product.id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to Cart <AiOutlineShoppingCart className="ml-1" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
