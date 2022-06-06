import { makeAutoObservable } from "mobx";
import instance from "./instance";
import decode from "jwt-decode";

class AuthStore {
  constructor() {
    makeAutoObservable(this);
    // this will turn our class into a mobx store and all components can observe the changes that happen in the store
  }

  user = null;

  setUser = (token) => {
    instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    localStorage.setItem("myToken", token);
    this.user = decode(token);
  };

  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now();
      const user = decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.signout();
      }
    }
  };

  signup = async (newUser) => {
    try {
      const response = await instance.post("/signup", newUser);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  signin = async (userData) => {
    try {
      const response = await instance.post("/signin", userData);
      this.setUser(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  signout = () => {
    delete instance.defaults.headers.common.Authorization;
    localStorage.removeItem("myToken");
    this.user = null;
  };

  // fetchProducts = async () => {
  //   try {
  //     const response = await instance.get("/products");
  //     this.products = response.data;
  //   } catch (error) {
  //     console.log("ProductStore -> fetchProducts -> error", error);
  //   }
  // };

  // updateProduct = async (updatedProduct, productId) => {
  //   try {
  //     const res = await instance.put(`/products/${productId}`, updatedProduct);
  //     this.products = this.products.map((product) =>
  //       product._id === productId ? res.data : product
  //     );
  //   } catch (error) {
  //     console.log("ProductStore -> updateProduct -> error", error);
  //   }
  // };

  // deleteProduct = async (productId) => {
  //   try {
  //     await instance.delete(`/products/${productId}`);
  //     this.products = this.products.filter(
  //       (product) => product._id !== productId
  //     );
  //   } catch (error) {
  //     console.log("ProductStore -> deleteProduct -> error", error);
  //   }
  // };
}

const authStore = new AuthStore();
authStore.checkForToken();
// It will only call this function when the app first starts
export default authStore;

// axios.METHOD(URL, BODY)

// GET: Fetching Data
// axios.get("http://localhost:8000/api/products");
// Return array of products

// POST => It takes a BODY, and is used when we Send Data (Create)
// axios.post("http://localhost:8000/api/products", newObject);
// Returns a new object

// PUT =>  It takes a BODY, and is used to Update Data. We must pass an ID.
// axios.put(`http://localhost:8000/api/products/${ID}`, updatedObject);
// Returns updated object

// DELETE => Delete some data. We must pass an ID.
// axios.delete(`http://localhost:8000/api/products/${ID}`);
// Returns nothing
