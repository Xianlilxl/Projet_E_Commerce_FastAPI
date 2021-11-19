import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../redux/action/product.action";

export default function Filter() {
  const [motCle, setMotCle] = useState("");
  const [categorie, setCategorie] = useState("all");

  const dispatch = useDispatch();

  return (
    <div>
      <div className="row justify-content-center shadow p-3 mb-5 bg-white rounded">
        <div className="col-md-3 ml-2" style={{ marginTop: "13px" }}>
          <input
            value={motCle}
            onChange={(e) => {
              setMotCle(e.target.value);
            }}
            type="text"
            placeholder="Recherche"
            className="form-control"
          />
        </div>
        <div className="col-md-2 mt-4 ml-2">
          <select
            className="form-control"
            value={categorie}
            onChange={(e) => {
              setCategorie(e.target.value);
            }}
          >
            <option value="all">Toutes Catégories</option>
            <option value="electronique">Electronique</option>
            <option value="mode">Mode</option>
            <option value="culture">Culture</option>
          </select>
        </div>
        <div className="col-md-2 mt-4 ml-2">
          <button
            className="btn"
            onClick={() => {
              dispatch(filterProducts(motCle, categorie));
            }}
          >
            FILTRER
          </button>
        </div>
      </div>
    </div>
  );
}
