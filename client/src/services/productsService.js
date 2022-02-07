import http from "./httpService";

export function getProducts() {
  return http.get("http://localhost:3001/admin");
}

export function addProduct(product) {
  return http.post(`http://localhost:3001/admin`, product);
}

export function updateProduct(product) {
  return http.put(`http://localhost:3001/admin`, product);
}

export function deleteProduct(product) {
  return http.delete(`http://localhost:3001/admin`, product);
}
