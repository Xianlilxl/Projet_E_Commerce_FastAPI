import { Link } from "react-router-dom";

export default function Product({ product }) {
  return (
    <div className="text-left">
      <div>
        <Link className="pro" to={`produit/${product.produit_id}`}>
          <div className="text-center">
            <img src={product.product_image} className="img-fluid" alt={product.nom_produit} />
          </div>
          <h1>{product.nom_produit}</h1>

          <h1>Prix : {product.prix} €</h1>
        </Link>
        <div></div>
      </div>
    </div>
  );
}
