import { getProductById, updateProduct } from "../redux/action/product.action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Error from "./ErrorMessage";
import Loader from "./Loader";
import Success from "./Success";
import { Link } from "react-router-dom";

export default function Editproduct({ match }) {
  const dispatch = useDispatch();
  const productstate = useSelector((state) => state.getProductByIdReducer);

  const { product, error, loading } = productstate;

  const updateproductstate = useSelector((state) => state.updateProductReducer);

  const { success, updateerror, updateloading } = updateproductstate;

  const [nom_produit, setnom_produit] = useState("");
  const [prix, setprix] = useState();
  const [product_image, setproduct_image] = useState("");
  const [categorie, setcategorie] = useState("");
  const [description, setdescription] = useState("");
  const [quantite, setquantite] = useState();

  useEffect(() => {
    if (product) {
      if (product.produit_id === match.params.produit_id) {
        setnom_produit(product.nom_produit);
        setprix(product.prix);
        setdescription(product.description);
        setproduct_image(product.product_image);
        setcategorie(product.categorie);
        setquantite(product.quantite);
      } else {
        dispatch(getProductById(match.params.produit_id));
      }
    } else {
      dispatch(getProductById(match.params.produit_id));
    }
  }, [dispatch, product]);

  function editproduct(e) {
    e.preventDefault();
    const updatedproduct = {
      nom_produit: nom_produit,
      prix: prix,
      description: description,
      categorie: categorie,
      product_image: product_image,
      quantite: quantite,
    };

    dispatch(updateProduct(match.params.produit_id, updatedproduct));
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">

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

          <h2>Modifier le produit</h2>
          {loading && <Loader />}

          {updateloading && <Loader />}
          {updateerror && <Error error="Une erreur est en cours." />}
          {success && <Success success="La modification a été prise en compte." />}
          {error && <Error error="Une erreur est en cours." />}
          {product && (
            <div>
              <form onSubmit={editproduct}>
                <div className="control">
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Nom"
                    required
                    value={nom_produit}
                    onChange={(e) => {
                      setnom_produit(e.target.value);
                    }}
                    style={{height: "3.5em"}}
                  />
                  <label className={nom_produit && 'filled'}>Nom produit</label>
                </div>
                <div className="control">   
                  <input
                    type="text"
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Prix"
                    value={prix}
                    required
                    onChange={(e) => {
                      setprix(e.target.value);
                    }}
                    style={{height: "3.5em"}}
                  />
                  <label className={prix && 'filled'}>Prix</label>
                </div>
                <div className="control">   
                  <input
                    type="text"
                    required
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    style={{height: "3.5em"}}
                  />
                  <label className={description && 'filled'}>Description</label>
                </div>
                <div className="control">   
                  <input
                    type="text"
                    required
                    className="form-control mb-2 mr-sm-2"
                    placeholder="imageurl"
                    value={product_image}
                    onChange={(e) => {
                      setproduct_image(e.target.value);
                    }}
                    style={{height: "3.5em"}}
                  />
                  <label className={product_image && 'filled'}>Lien Image</label>
                </div>
                <div className="control">   
                  <input
                    type="text"
                    required
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Categorie"
                    value={categorie}
                    onChange={(e) => {
                      setcategorie(e.target.value);
                    }}
                    style={{height: "3.5em"}}
                  />
                  <label className={categorie && 'filled'}>Catégorie</label>
                </div>
                <div className="control">   
                  <input
                    type="text"
                    required
                    className="form-control mb-2 mr-sm-2"
                    placeholder="Quantité"
                    value={quantite}
                    onChange={(e) => {
                      setquantite(e.target.value);
                    }}
                    style={{height: "3.5em"}}
                  />
                  <label className={quantite && 'filled'}>Quantité</label>
                </div>
                <button
                  className="btn mt-5"
                  type="submit"
                  style={{ float: "left" }}
                >
                  MODIFIER
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
