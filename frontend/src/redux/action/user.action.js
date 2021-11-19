import axios from "axios";

export const registerNewUser = (user) => (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });

  axios
    .post("http://localhost:5000/inscription", user)
    .then((res) => {
      dispatch({ type: "USER_REGISTER_SUCCESS" });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: "USER_REGISTER_FAILED", payload: err });
      console.log(err);
    });
};

export const loginUser = (user) => (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });

  axios
    .post("/login", user)
    .then((res) => {
      dispatch({ type: "USER_LOGIN_SUCCESS" });
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      window.location.href = "/";
    })
    .catch((err) => {
      dispatch({
        type: "USER_LOGIN_FAILED",
        payload: err,
      });
      console.log(err);
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  // localStorage.removeItem("cartItems");

  dispatch({ type: "USER_LOGOUT" });

  window.location.href = "/login";
};

export const updateUser = (utilisateur_id, updateUser) => (dispatch) => {
  dispatch({
    type: "USER_UPDATE_REQUEST",
  });

  console.log(updateUser);

  axios
    .put(`/modifier_utilisateur/${utilisateur_id}`, updateUser)
    .then((res) => {
      dispatch({
        type: "USER_UPDATE_SUCCESS",
      });
      console.log(res);
      window.location.reload();
    })
    .catch((err) => {
      dispatch({
        type: "USER_UPDATE_FAILED",
        payload: err,
      });
      console.log(err);
    });
};

export const getAllUsers = () => (dispatch) => {
  dispatch({ type: "GET_ALLUSERS_REQUEST" });

  axios
    .get("/inscription")
    .then((res) => {
      dispatch({ type: "GET_ALLUSERS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "GET_ALLUSERS_FAILED", payload: err });
    });
};

export const deleteUser = (utilisateur_id) => (dispatch) => {
  dispatch({
    type: "DELETE_USER_REQUEST",
  });

  axios
    .delete(`/supprimer_utilisateur/${utilisateur_id}`)
    .then((res) => {
      dispatch({
        type: "DELETE_USER_SUCCESS",
        payload: res.data,
      });
      alert("L'utilisateur a été supprimé.");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({
        type: "DELETE_USER_FAILED",
        payload: err,
      });
    });
};
