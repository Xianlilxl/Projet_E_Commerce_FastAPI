import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getAllProducts } from "../redux/action/product.action";
import Loader from "./Loader";
import Error from "./ErrorMessage";
import { Link } from "react-router-dom";

export default function ProductList() {
  const dispatch = useDispatch();
  const getallproductsstate = useSelector(
    (state) => state.getAllProductsReducer
  );
  const { products, loading, error } = getallproductsstate;

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>Liste des produits</h2>
      {loading && <Loader />}
      {error && <Error error="Un disfonctionnement est détecté." />}

      <table className="table table-bordered table-responsive-sm">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Id</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {products &&
            products.map((product) => {
              return (
                <tr key={product.produit_id}>
                  <td>{product.nom_produit}</td>
                  <td>{product.prix}</td>
                  <td>{product.quantite}</td>
                  <td>{product.produit_id}</td>
                  <td>
                    <i
                      className="far fa-trash-alt"
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        dispatch(deleteProduct(product.produit_id));
                      }}
                    ></i>
                    <Link to={`/modifproduit/${product.produit_id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
