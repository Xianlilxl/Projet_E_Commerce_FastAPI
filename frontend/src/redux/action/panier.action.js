export const addToCart = (product, nombre) => (dispatch, getState) => {
    const cartItems = {
      nom_produit: product.nom_produit,
      _id: product.produit_id,
      prix: product.prix,
      quantite: product.quantite,
      nombre: nombre,
    };
  
    dispatch({ type: "ADD_TO_CART", payload: cartItems });
  
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };
  
  export const deleteFromCart = (item) => (dispatch, getState) => {
    dispatch({
      type: "DELETE_FROM_CART",
      payload: item,
    });
  
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cartReducer.cartItems)
    );
  };
  