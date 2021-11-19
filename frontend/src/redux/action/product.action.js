import axios from "axios";
export const getAllProducts = () => (dispatch) => {
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/produit")
    .then((res) => {
      console.log(res);

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

export const filterProducts = (motCle, categorie) => (dispatch) => {
  var filteredproducts;
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/produit")
    .then((res) => {
      filteredproducts = res.data;

      if (motCle) {
        filteredproducts = res.data.filter((produit) => {
          return produit.nom_produit.toLowerCase().includes(motCle);
        });
      }

      if (categorie !== "all") {
        filteredproducts = res.data.filter((produit) => {
          return produit.categorie.toLowerCase().includes(categorie);
        });
      }

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: filteredproducts });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED" });
    });
};

export const AuthHeader = (currentUser) => {
  if (currentUser && currentUser.jwtToken) {
    return { Authorization: "Bearer " + currentUser.jwtToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
};


export const getProductById = (produit_id) => (dispatch) => {
  dispatch({ type: "GET_PRODUCTBYID_REQUEST" });
  axios
    .get(`/produit/${produit_id}`)
    .then((res) => {
      console.log(res.data);

      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "GET_PRODUCTBYID_FAILED",
        payload: err,
      });
    });
};

export const deleteProduct = (produit_id) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST" });

  axios
    .delete(`/produit/${produit_id}`)
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: res.data });
      alert("Le produit a été supprimé.");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCT_FAILED", payload: err });
    });
};

export const addProduct = (product) => (dispatch) => {
  dispatch({ type: "ADD_PRODUCT_REQUEST" });
  console.log(product);

  axios
    .post("/produit", product)
    .then((res) => {
      console.log(res);
      dispatch({ type: "ADD_PRODUCT_SUCCESS" });
      // window.location.reload();
      window.location.href = "/admin";
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_FAILED" });
    });
};

export const updateProduct = (produit_id, updatedproduct) => (dispatch) => {
  dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

  axios
    .put(`/produit/${produit_id}`, updatedproduct)
    .then((res) => {
      console.log(res);
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
      window.location.href = "/admin/productslist";
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_PRODUCT_FAILED" });
    });
};
