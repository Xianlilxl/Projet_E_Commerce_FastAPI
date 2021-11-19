import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerNewUser } from "../redux/action/user.action";
import Loader from "./Loader";
import Error from "./ErrorMessage";
import Success from "./Success";
import { Link } from "react-router-dom";

export default function RegisterScreen() {
  
  const [nom_utilisateur, setNom_utilisateur] = useState("");
  // const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [confirmationMdp, setConfirmationMdp] = useState("");

  const registerstate = useSelector((state) => state.registerNewUserReducer);

  const { loading, error, success } = registerstate;

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      nom_utilisateur: nom_utilisateur,
      // prenom: prenom,
      email: email,
      mdp: mdp,
    };

    if (mdp === confirmationMdp) {
      dispatch(registerNewUser(user));
    } else {
      alert("Les mots de passe sont incorrects.");
    }
  };

  return (
    <div>
      <div className="row justify-content-center m-3">
        <div
          className="col-md-5 card p-3 shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: "100px" }}
        >
          <div className="div">
          <h1 className="title has-text-centered">Inscription</h1>
            <i
              style={{ fontSize: "25px" }}
              className="fa fa-user-plus"
              aria-hidden="true"
            ></i>
            {loading && <Loader />}
            {error && (
              <Error error="Cette adresse email est déjà relié à un compte."></Error>
            )}
            {success && <Success success="Votre compte a été créé." />}
            <form onSubmit={handleSubmit}>
            <div className="field">  
              <div className="control">
                <input
                  type="nom"
                  value={nom_utilisateur}
                  onChange={(e) => setNom_utilisateur(e.target.value)}
                  className="input"
                  required
                  style={{height: "3em"}}
                />
                <label className={nom_utilisateur && 'filled'}>Nom d'utilisateur</label>
              </div>
            </div>
            {/* <div className="field">
              <div className="control">
                <input
                  type="prenom"
                  value={prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  className="input"
                  required
                  style={{height: "3em"}}
                />
                <label className={prenom && 'filled'}>Prénom</label>
              </div>
            </div> */}
            <div className="field">
              <div className="control">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                  style={{height: "3em"}}
                />
                <label className={email && 'filled'}>Adresse email</label>
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  type="password"
                  value={mdp}
                  onChange={(e) => setMdp(e.target.value)}
                  className="input"
                  required
                  style={{height: "3em"}}
                />
                <label className={mdp && 'filled'}>Mot de passe</label>            
              </div>
            </div>
            <div className="field">
              <div className="control">
                <input
                  type="password"
                  value={confirmationMdp}
                  onChange={(e) => setConfirmationMdp(e.target.value)}
                  className="input"
                  required
                  style={{height: "3em"}}
                />
                <label className={confirmationMdp && 'filled'}>Confirmation du mot de passe</label>
              </div>
            </div>

              <div className="text-right">
                <button type="submit" className="btn mt-3">
                  Soumettre
                </button>
              </div>
            </form>
          </div>
          <Link style={{ color: "black" }} to="/login" className="m-3">
            Cliquez ici pour vous connecter
          </Link>
        </div>
      </div>
    </div>
  );
}
