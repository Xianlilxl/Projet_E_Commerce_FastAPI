import { useState } from "react";
import Success from "./Success";
import Error from "./ErrorMessage";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/action/product.action";
import { Link } from "react-router-dom";

export default function AddProduct() {
  const [nom_produit, setnom_produit] = useState("");
  const [prix, setprix] = useState();
  const [product_image, setproduct_image] = useState("");
  const [categorie, setcategorie] = useState("");
  const [description, setdescription] = useState("");
  const [quantite, setquantite] = useState();
  const dispatch = useDispatch();

  const addproductstate = useSelector((state) => state.addProductReducer);
  const { success, error, loading } = addproductstate;

  const addproduct = (e) => {
    e.preventDefault();
    const product = {
      nom_produit: nom_produit,
      product_image: product_image,
      categorie: categorie,
      description: description,
      prix: prix,
      quantite: quantite,
    };

    dispatch(addProduct(product));
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">
          {success && <Success success="Produit ajouté avec succès." />}
          {loading && <Loader />}
          {error && <Error error="Un disfonctionnement a été détecté." />}
          <h2>Gestion des produits</h2>
          <ul className="admin p-2">
            <li>
              <Link to="/admin/produitslist" style={{ color: "black" }}>
                Liste des produits
              </Link>
            </li>
            <li>
              <Link to="/ajoutproduit" style={{ color: "black" }}>
                Ajouter un nouveau produit
              </Link>
            </li>
          </ul>
          <h2>Ajouter un produit</h2>
          <form onSubmit={addproduct}>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="Nom"
              required
              value={nom_produit}
              onChange={(e) => {
                setnom_produit(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control mb-2 mr-sm-2"
              placeholder="Prix"
              value={prix}
              required
              onChange={(e) => {
                setprix(e.target.value);
              }}
            />
            <input
              type="text"
              required
              className="form-control mb-2 mr-sm-2"
              placeholder="Description"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <input
              type="text"
              required
              className="form-control mb-2 mr-sm-2"
              placeholder="imageurl"
              value={product_image}
              onChange={(e) => {
                setproduct_image(e.target.value);
              }}
            />
            <input
              type="text"
              required
              className="form-control mb-2 mr-sm-2"
              placeholder="Catégorie"
              value={categorie}
              onChange={(e) => {
                setcategorie(e.target.value);
              }}
            />
            <input
              type="text"
              required
              className="form-control mb-2 mr-sm-2"
              placeholder="Quantité"
              value={quantite}
              onChange={(e) => {
                setquantite(e.target.value);
              }}
            />
            <button
              className="btn mt-5"
              type="submit"
              style={{ float: "left" }}
            >
              AJOUTER
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
