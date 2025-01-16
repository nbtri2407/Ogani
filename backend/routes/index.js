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
const createOrder = require("../controllers/order/createOrder");
const payment = require("../controllers/payment/payment");
const callBackPayment = require("../controllers/payment/callbackPayment");
const checkPayment = require("../controllers/payment/checkPayment");
const getOrder = require("../controllers/order/getOrder");
const retryPayment = require("../controllers/payment/retryPayment ");
const getOrderDetails = require("../controllers/order/getOrderDetails");
const updatePaymentOrder = require("../controllers/order/updatePaymentOrder");
const updateStatusOrder = require("../controllers/order/updateStatusOrder");
const cancelOrder = require("../controllers/order/cancelOrder");
const refundPayment = require("../controllers/payment/refundPayment");
const deleteAddress = require("../controllers/address/deleteAddress");
const getAllOrder = require("../controllers/order/getAllOrder");
const feedBackOrder = require("../controllers/order/feedBackOrder");
const addToWishList = require("../controllers/products/addToWishList");
const deleteWishList = require("../controllers/products/deleteWishList");
const addPromoCode = require("../controllers/discount/addPromoCode");
const getAllPromoCode = require("../controllers/discount/getAllPromoCode");
const deletePromoCode = require("../controllers/discount/deletePromoCode");
const updatePromoCode = require("../controllers/discount/updatePromoCode");
const applyPromoCode = require("../controllers/discount/applyPromoCode");
const getStatistics1 = require("../controllers/statistics/getStatistics1");
const getTopProduct = require("../controllers/statistics/getTopProduct");
const getOrderStatistic = require("../controllers/statistics/getOrderStatistic");
const getCategoryById = require("../controllers/categories/getCategoryById");
const getRecommendations = require("../controllers/products/getRecommendations");
const exportCSV = require("../controllers/products/exportCSV");
const getOrderCount = require("../controllers/statistics/getOrderCount");
const { getRevenueStatistics } = require("../controllers/statistics/getRevenueStatistics");
const router = express.Router();

router.post("/login", login);
router.post("/google-login", googleLogin);
router.post("/signup", signup);
router.get("/user-logout", authToken, logout);

router.get("/get-user", authToken, getUserById);
router.get("/get-all-user", authToken, getAllUsers);
router.post("/update-user", authToken, updateInfoUser);

router.post("/wishlist", authToken, addToWishList);
router.patch("/wishlist", authToken, deleteWishList);
router.get("/recommentWishlist", authToken, getRecommendations);

router.get("/get-all-categories", getAllCategory);
router.get("/category", getCategoryById);
router.post("/add-category", authToken, addCategory);
router.delete("/delete-category", authToken, deleteCategory);
router.put("/update-category", authToken, updateCategory);

router.get("/get-all-products", getAllProducts);
router.get("/export", exportCSV);
router.post("/add-product", authToken, addProduct);
router.delete("/delete-product", authToken, deleteProduct);
router.put("/update-product", authToken, updateProduct);
router.get("/product-details", productDetails);

router.post("/update-cart", authToken, updateCart);
router.post("/merge-cart", authToken, mergeCart);
router.get("/get-cart", authToken, getCart);

router.get("/address", authToken, getAllAddress);
router.post("/address", authToken, addAddress);
router.put("/address", authToken, updateAddress);
router.patch("/address", authToken, deleteAddress);
router.post("/default-address", authToken, setDefaultAddress);

router.get("/order", authToken, getOrder);
router.get("/all-order", authToken, getAllOrder);
router.get("/order/:orderId", authToken, getOrderDetails);
router.post("/order", authToken, createOrder);
router.put("/order", authToken, updatePaymentOrder);
router.patch("/order", authToken, updateStatusOrder);
router.post("/cancel-order", authToken, cancelOrder);
router.post("/feedback", authToken, feedBackOrder);

router.post("/payment", authToken, payment);
router.post("/callback", callBackPayment);
router.post("/check-status-order", authToken, checkPayment);

router.post("/retryPayment", authToken, retryPayment);
router.post("/refundPayment", authToken, refundPayment);

router.get("/promoCode", getAllPromoCode);
router.post("/promoCode", authToken, addPromoCode);
router.put("/promoCode", authToken, updatePromoCode);
router.delete("/promoCode", authToken, deletePromoCode);

router.post("/applyPromoCode", authToken, applyPromoCode);

router.get("/statistics1", authToken, getStatistics1);
router.get("/top-product", getTopProduct);
router.get("/order-statistics", authToken, getOrderStatistic);
router.get("/orders/count", authToken, getOrderCount);
router.get("/revenue-statistics", authToken, getRevenueStatistics);

// getProducts
module.exports = router;
