import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/action/user.action";
import Error from "./ErrorMessage";
import Loader from "./Loader";
import Success from "./Success";

export default function Profilescreen() {
  const loginstate = useSelector((state) => state.loginReducer);
  const updateuserstate = useSelector((state) => state.updateReducer);
  const currentUser = loginstate.currentUser;
  const { loading, success, error } = updateuserstate;
  const dispatch = useDispatch();
  const [nom_utilisateur, setnom_utilisateur] = useState(currentUser.nom_utilisateur);
  const [email, setemail] = useState(currentUser.email);
  const [mdp, setmdp] = useState("");
  const [confirmationMdp, setconfirmationMdp] = useState("");

  function update(e) {
    e.preventDefault();
    if (mdp === confirmationMdp) {
      const updateduser = {
        nom_utilisateur: nom_utilisateur,
        email: email,
        mdp: mdp,
      };
      dispatch(updateUser(currentUser.utilisateur_id, updateduser));
    } else {
      alert("Les mots de passe ne correspondent pas.");
    }
  }

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-5 card p-3" style={{ marginTop: "150px" }}>
          <div className="div">
            <h2 className="text-center m-3">Compte</h2>

            {loading && <Loader />}
            {error && <Error error="Un disfonctionnement est détecté."></Error>}
            {success && (
              <Success success="Les modifications ont été apportées, reconnectez vous svp." />
            )}

            <form onSubmit={update}>
              <input
                type="text"
                placeholder="Nom"
                className="form-control"
                required
                value={nom_utilisateur}
                onChange={(e) => {
                  setnom_utilisateur(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Adresse email"
                className="form-control"
                value={email}
                required
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="Mot de passe"
                className="form-control"
                value={mdp}
                required
                onChange={(e) => {
                  setmdp(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="Confirmez le mot de passe"
                className="form-control"
                value={confirmationMdp}
                required
                onChange={(e) => {
                  setconfirmationMdp(e.target.value);
                }}
              />

              <div className="text-right">
                <button type="submit" className="btn mt-3">
                  MODIFIER
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
