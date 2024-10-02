const backendDomain = "http://localhost:5050/api";
const SummaryApi = {
  signUp: {
    url: `${backendDomain}/signup`,
  },
  login: {
    url: `${backendDomain}/login`,
  },
  getUserDetails: {
    url: `${backendDomain}/get-user`,
  },
  userLogout: {
    url: `${backendDomain}/user-logout`
  },
  getAllCategory: {
    url: `${backendDomain}/get-all-categories`,
  },
  getAllProduct: {
    url: `${backendDomain}/get-all-products`,
  },
  getProductDetail: {
    url: `${backendDomain}/product-details`,
  },
};
// product-details
export default SummaryApi;
