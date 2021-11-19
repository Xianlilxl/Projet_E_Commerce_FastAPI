import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../redux/action/panier.action";

export default function Panier() {
  const cartreducerstate = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const { cartItems } = cartreducerstate;

  var subtotal = cartItems.reduce(
    (acc, item) => acc + item.prix * item.nombre,
    0
  );

  return (
    <div>
      <div className="row mt-3 justify-content-center">
        <div className="col-md-8 card text-center shadow p-3 mb-5 bg-white rounded">
          <div className="text-center m-5"><h2>Mon panier</h2></div>
          <table className="table table-bordered table-responsives-sm">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Prix</th>
                <th>Quantité</th>
                <th>Total</th>
                <th>Supprimer</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                return (
                  <tr>
                    <td>{item.nom_produit}</td>
                    <td>{item.prix}</td>
                    <td>
                      <select
                        value={item.nombre}
                        onChange={(e) => {
                          dispatch(addToCart(item, e.target.value));
                        }}
                      >
                        {[...Array(item.quantite).keys()].map((x, i) => {
                          return <option value={i + 1}>{i + 1}</option>;
                        })}
                      </select>
                    </td>

                    <td>{item.nombre * item.prix}</td>
                    <td>
                      <i
                        style={{ color: "red" }}
                        class="far fa-trash-alt"
                        onClick={() => {
                          dispatch(deleteFromCart(item));
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <hr />
          <h1 className="text-center">Total : {subtotal} €</h1>
          <hr />
          
        </div>
      </div>
    </div>
  );
}
