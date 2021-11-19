import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/action/user.action";
import Loader from "./Loader";
import Error from "./ErrorMessage";

export default function LoginScreen() {
  const loginreducer = useSelector((state) => state.loginReducer);
  const { loading, error } = loginreducer;
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const coba_login = new FormData();

    coba_login.append("username", email);
    coba_login.append("password", mdp);

    dispatch(loginUser(coba_login));
  };

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center m-3">
        <div
          className="col-md-4 card p-3 shadow p-3 mb-5 bg-white rounded"
          style={{ marginTop: "100px" }}
        >
          <div className="div">
          <h1 className="title has-text-centered">Se connecter</h1>
            <i
              style={{ fontSize: "25px" }}
              className="fa fa-sign-in"
              aria-hidden="true"
            ></i>

            {error && <Error error="Identifiants incorrects." />}
            {loading && <Loader />}

            <form onSubmit={handleSubmit}>
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
                    className="input"
                    required
                    style={{height: "3em"}}
                    onChange={(e) => setMdp(e.target.value)}
                  />
                  <label className={mdp && 'filled'}>Mot de passe</label>
                </div>
              </div>
              <br />
              <div className="text-right">
              <button className="btn" type="submit">
                Connexion
              </button>
              </div>
            </form>
          </div>

          <a style={{ color: "black" }} href="/inscription" className="mt-3">
              Cliquez ici pour créer un compte.
          </a>
        </div>
      </div>
    </div>
  );
}
