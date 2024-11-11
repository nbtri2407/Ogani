const backendDomain = "http://localhost:5050/api";
const SummaryApi = {
  signUp: {
    url: `${backendDomain}/signup`,
  },
  login: {
    url: `${backendDomain}/login`,
  },
  googleLogin: {
    url: `${backendDomain}/google-login`,
  },
  getUserDetails: {
    url: `${backendDomain}/get-user`,
  },
  userLogout: {
    url: `${backendDomain}/user-logout`,
  },
  updateUser: {
    url: `${backendDomain}/update-user`,
  },
  getAllCategory: {
    url: `${backendDomain}/get-all-categories`,
  },
  getCategoryById: {
    url: `${backendDomain}/category`,
  },
  getAllProduct: {
    url: `${backendDomain}/get-all-products`,
  },
  getProductDetail: {
    url: `${backendDomain}/product-details`,
  },
  updateCart: {
    url: `${backendDomain}/update-cart`,
  },
  mergeCart: {
    url: `${backendDomain}/merge-cart`,
  },
  address: {
    url: `${backendDomain}/address`,
  },
  setDefaultAddress: {
    url: `${backendDomain}/default-address`,
  },
  order: {
    url: `${backendDomain}/order`,
  },
  feedback: {
    url: `${backendDomain}/feedback`,
  },
  cancelOrder: {
    url: `${backendDomain}/cancel-order`,
  },
  refundPayment: {
    url: `${backendDomain}/refundPayment`,
  },
  payment: {
    url: `${backendDomain}/payment`,
  },
  checkPayment: {
    url: `${backendDomain}/check-status-order`,
  },
  retryPayment: {
    url: `${backendDomain}/retryPayment`,
  },
  wishlist: {
    url: `${backendDomain}/wishlist`,
  },
  promoCode: {
    url: `${backendDomain}/promoCode`,
  },
  applyPromoCode: {
    url: `${backendDomain}/applyPromoCode`,
  },
  recommentWishlist: {
    url: `${backendDomain}/recommentWishlist`,
  },
};
//recommentWishlist
export default SummaryApi;
