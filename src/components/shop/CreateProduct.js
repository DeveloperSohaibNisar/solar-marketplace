import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { categoriesData } from "../../static/data";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { backendURL } from "../../config";
import { uploadProduct } from "../../redux/actions/vendor";

const CreateProduct = () => {
  // const { seller } = useSelector((state) => state.seller);
  // const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.data);
  const vendor = useSelector((state) => state.vendor);

  const [images, setImages] = useState([]);
  const [name, setName] = useState("High Efficiency Solar Panel");
  const [description, setDescription] = useState(
    "High-efficiency solar panel for residential and commercial use. Generate clean energy and reduce your carbon footprint."
  );
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [originalPrice, setOriginalPrice] = useState(39.99);
  const [discountPrice, setDiscountPrice] = useState(35.99);
  const [stock, setStock] = useState(0);
  const [detail, setDetail] =
    useState(`Product details provide comprehensive information about a particular item, aiding consumers in making informed purchasing decisions. These details typically include specifics such as product dimensions, materials, features, and functionalities. They may also encompass pricing information, including discounts or special offers, as well as availability and stock levels.

Additionally, product details often incorporate descriptive text to highlight key selling points, such as unique attributes, benefits, and intended usage scenarios. In essence, product details serve as a vital tool for consumers to evaluate the suitability of a product based on their needs and preferences, ultimately facilitating a seamless shopping experience.

With product details, shoppers can confidently assess whether a product meets their requirements and preferences. From understanding its technical specifications to evaluating its suitability for specific needs, these details empower consumers to make informed choices. Whether browsing online or in-store, clear and concise product details play a crucial role in enhancing the shopping experience, enabling customers to find the perfect product with ease.`);

  const handleImageChange = (e) => {
    const files = Object.values(e.target.files);
    setImages(files);
  };

  const handleCategoryChange = (e) => {
    const index = e.target.selectedIndex;
    const el = e.target.childNodes[index];
    const id = el.getAttribute("id");
    setCategory(e.target.value);
    setCategoryId(id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      description,
      categoryId,
      originalPrice,
      discountPrice,
      stock,
      detail,
      images,
      vendorId: vendor.credentials.id,
    };

    dispatch(uploadProduct(productData));
  };

  return (
    <div className="w-[90%] bg-white shadow max-h-[80vh] rounded-[4px] p-6 overflow-y-auto">
      <h5 className="text-[30px] font-Poppins text-center mb-6 font-medium">
        Create Product
      </h5>
      <form
        onSubmit={handleSubmit}
        className="flex justify-start gap-x-8 gap-y-4"
      >
        <div className="w-full 800px:w-[210px]">
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="m-0 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
            required
          />
        </div>

        <div className="w-full 800px:w-[210px]">
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            className="m-0 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={category}
            onChange={handleCategoryChange}
            required
          >
            <option id={null} value="">
              Choose a category
            </option>
            {categories &&
              categories.map((category) => (
                <option
                  value={category.name}
                  key={category.id}
                  id={category.id}
                >
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="w-full 800px:w-[210px]">
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            name="price"
            value={originalPrice}
            className="m-0 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setOriginalPrice(e.target.value)}
            placeholder="Enter your product price..."
            required
          />
        </div>
        <div className="w-full 800px:w-[210px]">
          <label className="pb-2">
            Price (With Discount) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="discount price"
            value={discountPrice}
            className="m-0 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDiscountPrice(e.target.value)}
            placeholder="Enter your product price with discount..."
            required
          />
        </div>
        <div className="w-full 800px:w-[210px]">
          <label className="pb-2">
            Product Stock <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            name="stock"
            value={stock}
            className="m-0 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setStock(e.target.value)}
            placeholder="Enter your product stock..."
            required
          />
        </div>

        <div className="w-full 800px:w-[210px]">
          <label className="pb-2 block m-0">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="images"
            id="upload"
            className="inline-block size-0 m-0"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            required
          />
          <div className="inline-block -ml-7 bg-white pb-2">
            <label htmlFor="upload">
              <AiOutlinePlusCircle size={30} color="#555" />
            </label>
          </div>
        </div>
        <div className="basis-full">
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="2"
            type="text"
            name="description"
            value={description}
            className="m-0 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter your product description..."
          />
        </div>
        <div className="basis-full">
          <label className="pb-2">
            Details <span className="text-red-500">*</span>
          </label>
          <textarea
            cols="30"
            required
            rows="6"
            type="text"
            name="datail"
            value={detail}
            className="m-0 appearance-none block w-full pt-2 px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setDetail(e.target.value)}
            placeholder="Enter your product details..."
          />
        </div>
        {images &&
          images.map((image, i) => (
            <img
              src={URL.createObjectURL(image)}
              key={i}
              alt={image.name}
              className="h-[120px] w-[120px] object-cover m-2"
            />
          ))}
        <input
          type="submit"
          value="Create"
          className="m-0 cursor-pointer appearance-none text-center text-white  w-full px-3 border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-white focus:border-white  bg-[#051D40] "
        />
      </form>
    </div>
  );
};

export default CreateProduct;
