import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../redux/action/user.action";
import Loader from "./Loader";
import Error from "./ErrorMessage";

export default function UsersList() {
  const getallusersstate = useSelector((state) => state.getAllUsersReducer);
  const { users, loading, error } = getallusersstate;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div>
      <div className="row justify-content-center"> 
        <div className="col-md-10">
            <h2>Liste des utilisateurs</h2>
            {loading && <Loader />}
            {error && <Error error="Une erreur est en cours." />}
            <table className="table table-bordered table-responsive-sm">
                <thead>
                <tr>
                    <th>Id de l'utilisateur</th>
                    <th>Nom d'utilisateur</th>
                    <th>Adresse email</th>
                    <th>Supprimer</th>
                </tr>
                </thead>

                <tbody>
                {users &&
                    users.map((user) => {
                    return (
                        <tr key={user.utilisateur_id}>
                        <td>{user.utilisateur_id}</td>
                        <td>{user.nom_utilisateur}</td>
                        <td>{user.email}</td>
                        <td>
                            <i
                            class="far fa-trash-alt"
                            onClick={() => {
                                dispatch(deleteUser(user.utilisateur_id));
                            }}
                            ></i>
                        </td>
                        </tr>
                    );
                    })}
                </tbody>
            </table>
        </div>
      </div>  
    </div>
  );
}
