const express = require("express");
const signup = require("../controllers/user/signup");
const login = require("../controllers/user/login");
const getUserById = require("../controllers/user/getUserById");
const authToken = require("../middleware/auth");
const logout = require("../controllers/user/logout");
const getAllUsers = require("../controllers/user/getAllUsers");
const addCategory = require("../controllers/categories/addCategory");
const getAllCategory = require("../controllers/categories/getAllCategories");
const deleteCategory = require("../controllers/categories/deleteCategory");
const updateCategory = require("../controllers/categories/updateCategory");
const getAllProducts = require("../controllers/products/getAllProducts");
const addProduct = require("../controllers/products/addProduct");
const deleteProduct = require("../controllers/products/deleteProduct");
const updateProduct = require("../controllers/products/updateProduct");
const productDetails = require("../controllers/products/getProductById");
const googleLogin = require("../controllers/user/googleLogin");
const updateCart = require("../controllers/cart/updateCart");
const mergeCart = require("../controllers/cart/mergeCart");
const getCart = require("../controllers/cart/getCart");
const updateInfoUser = require("../controllers/user/updateUser");
const addAddress = require("../controllers/address/addAddressController");
const getAllAddress = require("../controllers/address/getAllAddress");
const setDefaultAddress = require("../controllers/address/setDefaultAddress");
const updateAddress = require("../controllers/address/updateAddress");
const router = express.Router();

router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/signup", signup);
router.get("/user-logout", authToken, logout);

router.get("/get-user", authToken, getUserById);
router.get("/get-all-user", authToken, getAllUsers);
router.post("/update-user", authToken, updateInfoUser);

router.get("/get-all-categories", getAllCategory);
router.post("/add-category", authToken, addCategory);
router.delete("/delete-category", authToken, deleteCategory);
router.put("/update-category", authToken, updateCategory);

router.get("/get-all-products", getAllProducts);
router.post("/add-product", authToken, addProduct);
router.delete("/delete-product", authToken, deleteProduct);
router.put("/update-product", authToken, updateProduct);
router.get("/product-details", productDetails);
// router.put("/update-product", authToken, updateCategory);updateProduct

router.post("/update-cart", authToken, updateCart);
router.post("/merge-cart", authToken, mergeCart);
router.get("/get-cart", authToken, getCart);

router.get("/address", authToken, getAllAddress);
router.post("/address", authToken, addAddress);
router.put("/address", authToken, updateAddress);
router.delete("/address", authToken, addAddress);
router.post("/default-address", authToken, setDefaultAddress);
// setDefaultAddress
module.exports = router;
