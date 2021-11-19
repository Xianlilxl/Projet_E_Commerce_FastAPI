import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../redux/action/product.action";
import Loader from "./Loader";
import Error from "./ErrorMessage";
import { addToCart } from "../redux/action/panier.action";

export default function ProductDetail({ match }) {
  const produit_id = match.params.produit_id;
  const dispatch = useDispatch();
  const getproductstate = useSelector((state) => state.getProductByIdReducer);
  const { product, loading, error } = getproductstate;
  const [nombre, setNombre] = useState(1);

  const addCart = () => {
    dispatch(addToCart(product, nombre));
  };

  useEffect(() => {
    dispatch(getProductById(produit_id));
    console.log(product.produit_id);
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error />
      ) : (
        <div className="row">
          <div className="col-md-6">
            <div className="card p-2 m-2">
              <h2>{product.nom_produit}</h2>
              <img
                src={product.product_image}
                alt={product.nom_produit}
                className="img-fluid m-3 bigimg"
              />
            </div>
          </div>
          <div className="col-md-6 text-left">
            <div className="m-2">
              <h1>Prix: </h1> <h3>{product.prix} €</h3>
              <br />
              <br />
              <h1>Description: </h1> <h3>{product.description}</h3>
              <br />
              <br />
              <h1>Catégorie: </h1> <h3>{product.categorie}</h3>
              <br />
              <br />
              <h1>Quantité d'articles</h1>
              <select
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              >
                {[...Array(product.quantite).keys()].map((x, i) => {
                  return <option value={i + 1}>{i + 1}</option>;
                })}
              </select>
              <hr />
              {product.quantite > 0 ? (
                <button className="btn btn-dark" onClick={addCart}>
                  Ajouter au panier
                </button>
              ) : (
                <div>
                  <h1>Rupture de stock</h1>
                  <button className="btn" disabled>
                    Ajouter au panier
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
