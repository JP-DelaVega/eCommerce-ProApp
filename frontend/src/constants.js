export const BASE_URL = process.env.NODE_ENV === "development" ? "http://localhost:5000/api" : "";
export const PRODUCT_URL = `${BASE_URL}/products`;
export const USER_URL = `${BASE_URL}/users`;
export const ORDER_URL = `${BASE_URL}/orders`;
export const PAPYPAL_URL = `${BASE_URL}/config/paypal`;