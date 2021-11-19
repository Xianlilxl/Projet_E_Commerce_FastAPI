import { useEffect } from "react";
import { Link, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductList from "./ProductList";
import AddProduct from "./AddProduct";
import Editproduct from "./EditProduct";

export default function AdminScreen() {
  const userState = useSelector((state) => state.loginReducer);
  const currentUser = userState.currentUser;

  useEffect(() => {
    if (!currentUser) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center mt-2">
        <div className="col-md-10">
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

          {/* Switch */}
          <Switch>
            <Route path="/admin/" component={ProductList} />
            <Route path="/admin/produitslist" component={ProductList} />
            <Route path="/ajoutproduit" component={AddProduct} />
            <Route
              path="/modifproduit/:produit_id"
              component={Editproduct}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
}
