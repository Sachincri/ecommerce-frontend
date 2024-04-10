import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import toast from "react-hot-toast";

import { FaImages } from "react-icons/fa";
import Loader from "../../layout/Loader";
import { BsSpellcheck } from "react-icons/bs";
import { IoShieldCheckmarkSharp } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateProduct } from "../../../Redux/action/admin";
import { getProductDetails } from "../../../Redux/action/product";
import {
  MdAccountTree,
  MdDescription,
  MdStorage,
  MdAttachMoney,
  MdOutlineClose,
} from "react-icons/md";
import { AiFillHighlight } from "react-icons/ai";

const UpdateProduct = () => {
  const { product } = useSelector((state) => state.product);
  const { error, message, loading } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [offers, setOffers] = useState([]);
  const [discount, setDiscount] = useState("");
  const [offersInput, setOffersInput] = useState("");
  const [category, setCategory] = useState("");
  const [warranty, setWarranty] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [highlights, setHighlights] = useState([]);
  const [cuttedPrice, setCuttedPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imagesPreview, setImagesPreview] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");

  const categories = [
    "Mobiles",
    "Laptop",
    "Headphone",
    "Powerbank",
    "Tshirt",
    "Jeans",
    "Shoes",
    "Kurta",
    "Saree",
    "Monitor",
  ];
  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput("");
  };
  const addOffers = () => {
    const trimmedOffers = offersInput.trim();
    if (!trimmedOffers) return;
    setOffers((prevOffers) => [...prevOffers, trimmedOffers]);
    setOffersInput("");
  };

  const deleteHighlight = (index) => {
    setHighlights(highlights.filter((h, i) => i !== index));
  };
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.set("name", name);
    formData.set("price", price);
    formData.set("stock", stock);
    formData.set("warranty", warranty);
    formData.set("category", category);
    formData.append("discount", discount);
    formData.set("description", description);
    formData.append("cuttedPrice", cuttedPrice);
    images.forEach((image) => {
      formData.append("images", image);
    });
    offers.forEach((off) => {
      formData.append("offers", off);
    });
    highlights.forEach((h) => {
      formData.append("highlights", h);
    });
    dispatch(updateProduct(params.id, formData));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setOldImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setOldImages((prevImg) => [...prevImg, reader.result]);
          setImages((prevImg) => [...prevImg, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  const removeOffers = (index) => {
    setOffers(offers.filter((h, i) => i !== index));
  };
  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setOffers(product.offers);
      setImagesPreview(images);
      setOldImages(product.images);
      setWarranty(product.warranty);
      setDiscount(product.discount);
      setCategory(product.category);
      setHighlights(product.highlights);
      setCuttedPrice(product.cuttedPrice);
      setDescription(product.description);
      setHighlightInput(product.highlightInput);
    }
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
      navigate("/admin/dashboard");
    }
    window.scrollTo(0, 0);
  }, [dispatch, error, product, message, productId, navigate, images]);

  return (
    <>
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div className="main">
          <>
            <Sidebar />
            <div className="product">
              <h2 className="heading">Dashboard</h2>

              <h1>Update Product</h1>
              <form onSubmit={updateProductSubmitHandler}>
                <div>
                  <BsSpellcheck />
                  <input
                    required
                    type="text"
                    value={name}
                    placeholder="Product Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <div>
                    <MdAttachMoney />
                    <input
                      required
                      type="number"
                      value={cuttedPrice}
                      placeholder="Crunt Price"
                      onChange={(e) => setCuttedPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <MdAttachMoney />
                    <input
                      required
                      value={price}
                      type="number"
                      placeholder="Price"
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      required
                      value={discount}
                      type="number"
                      placeholder="Discount"
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <div>
                    <MdAccountTree />
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="">Choose Category</option>
                      {categories.map((cate) => (
                        <option key={cate} value={cate}>
                          {cate}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <MdStorage />
                    <input
                      type="number"
                      placeholder="Stock"
                      required
                      onChange={(e) => setStock(e.target.value)}
                      value={stock}
                    />
                  </div>
                </div>
                <div>
                  <IoShieldCheckmarkSharp />
                  <input
                    type="text"
                    placeholder="Warranty"
                    onChange={(e) => setWarranty(e.target.value)}
                    value={warranty}
                  />
                </div>

                <div>
                  <FaImages />
                  <input
                    type="file"
                    name="images"
                    accept="image/*"
                    multiple
                    onChange={updateProductImagesChange}
                  />
                </div>
                <div>
                  {oldImages &&
                    oldImages.map((image, i) => (
                      <div key={i}>
                        <img src={image.url} alt="Old Product Preview" />
                      </div>
                    ))}
                </div>
                <div>
                  {imagesPreview.map((image, i) => (
                    <div key={i}>
                      <img src={image} alt="Product Preview" />
                    </div>
                  ))}
                </div>
                <div>
                  <AiFillHighlight />
                  <input
                    value={offersInput}
                    type="text"
                    placeholder="Offers"
                    onChange={(e) => setOffersInput(e.target.value)}
                  />
                  <span onClick={() => addOffers()}>Add</span>
                </div>

                <div>
                  {offers.map((off, i) => (
                    <div key={i}>
                      <p>{off}</p>{" "}
                      <span onClick={() => removeOffers(i)}>
                        <MdOutlineClose />
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <AiFillHighlight />
                  <input
                    value={highlightInput}
                    type="text"
                    placeholder="Highlight"
                    onChange={(e) => setHighlightInput(e.target.value)}
                  />
                  <span onClick={() => addHighlight()}>Add</span>
                </div>
                <div>
                  {highlights.map((h, i) => (
                    <div key={i}>
                      <p>{h}</p>
                      <span onClick={() => deleteHighlight(i)}>
                        <MdOutlineClose />
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <MdDescription />
                  <textarea
                    placeholder="Product Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="1"
                  ></textarea>
                </div>
                <button type="submit" isLoading={loading}>
                  Create
                </button>
              </form>
            </div>
          </>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;
