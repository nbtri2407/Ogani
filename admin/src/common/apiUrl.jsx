const backendDomain = "http://localhost:5050/api";
const SummaryApi = {
  login: {
    url: `${backendDomain}/login`,
  },
  getUserDetails: {
    url: `${backendDomain}/get-user`,
  },
  userLogout: {
    url: `${backendDomain}/user-logout`,
  },
  getAllUsers: {
    url: `${backendDomain}/get-all-user`,
  },
  getAllCategory: {
    url: `${backendDomain}/get-all-categories`,
  },
  addCategory: {
    url: `${backendDomain}/add-category`,
  },
  deleteCategory: {
    url: `${backendDomain}/delete-category`,
  },
  updateCategory: {
    url: `${backendDomain}/update-category`,
  },
  getAllProduct: {
    url: `${backendDomain}/get-all-products`,
  },
  addProduct: {
    url: `${backendDomain}/add-product`,
  },
  deleteProduct: {
    url: `${backendDomain}/delete-product`,
  },
  updateProduct: {
    url: `${backendDomain}/update-product`,
  },
  allOrder: {
    url: `${backendDomain}/all-order`,
  },
  order: {
    url: `${backendDomain}/order`,
  },
  promoCode: {
    url: `${backendDomain}/promoCode`,
  },
  statistics1: {
    url: `${backendDomain}/statistics1`,
  },
  topProduct: {
    url: `${backendDomain}/top-product`,
  },
  orderCount: {
    url: `${backendDomain}/orders/count`,
  },
  revenueStatistics: {
    url: `${backendDomain}/revenue-statistics`,
  },
}; /// /revenue-statistics
export default SummaryApi;
