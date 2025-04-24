import "./Profile.css";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/cc_logo_spotless_mustard.png";
import ModifyProfile from "../../components/ModifyProfile/ModifyProfile";
import LoginContext from "../../contexts/LoginContext";

interface UserProps {
  id: number | null;
  pseudo: string;
  email: string;
  inscription_date: string;
  profile_picture: string;
  token: string;
}

interface artwork {
  id: number;
  name: string;
  image: string;
}

function Profile() {
  const [infoUser, setInfoUser] = useState<UserProps | null>(null);
  const { user } = useContext(LoginContext);
  const [modifyPopUp, setModifyPopUp] = useState(false);
  const [contribution, setContribution] = useState<[artwork] | []>([]);

  // Fetch du profil en fonction de l'ID de l'utilisateur qui est connecté
  useEffect(() => {
    if (user) {
      fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update user profile");
          }
          return response.json();
        })
        .then((data: UserProps) => {
          setInfoUser(data);
        });
    }
  }, [user]);

  //Récupération des oeuvres posté par l'user
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user-artworks/${user?.user.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update user's information'");
        }
        return response.json();
      })
      .then((data) => {
        setContribution(data);
      })
      .catch((err) => console.error(err));
  }, [user?.user.id]);

  return (
    <>
      <Link
        to="/"
        className="link-logo"
        aria-label="Retour à la page d'accueil"
      >
        <img src={Logo} alt="Logo Citycanvas" className="narrow-logo" />
      </Link>
      <section className="profile-page">
        {infoUser ? (
          <>
            <h1>Profil</h1>
            <img
              src={
                infoUser?.profile_picture ||
                "https://avatar.iran.liara.run/public"
              }
              alt="avatar aléatoire du profil"
            />
            <section className="profile-sct">
              <h2>Tes informations</h2>
              <article className="user_profile">
                <article className="user_infos">
                  <h3>Pseudo</h3>
                  <p aria-label="ton pseudo">{infoUser.pseudo}</p>
                  <h3>Mail</h3>
                  <p aria-label="ton adresse mail" className="profile-info">
                    {infoUser.email}
                  </p>
                  <h3>Date d'inscription</h3>
                  <p
                    aria-label="ta date d'inscription"
                    className="profile-info"
                  >
                    {new Date(infoUser.inscription_date).toLocaleDateString()}
                  </p>
                </article>
                <button
                  className="modify-btn"
                  type="button"
                  onClick={() => setModifyPopUp(true)}
                >
                  Modifier
                </button>
              </article>
              <ModifyProfile
                infoUser={infoUser}
                modifyPopUp={modifyPopUp}
                setModifyPopUp={setModifyPopUp}
              />
              <h2>Tes contributions</h2>
              <article className="list-of-contribution">
                {contribution.length > 1 ? (
                  contribution.map((artwork) => (
                    <Link
                      to={`/StreetArtMap/${artwork.id}`}
                      key={artwork.id}
                      className="contribution"
                    >
                      <img src={artwork.image} alt={artwork.name} />
                      <p>{artwork.name}</p>
                    </Link>
                  ))
                ) : (
                  <p>Ajoute ta première oeuvre !</p>
                )}
              </article>
            </section>
          </>
        ) : (
          <article className="error_add">
            <h2>Oups ...</h2>
            <h3>Peut être faudrait-il te reconnecter :)</h3>
          </article>
        )}
      </section>
    </>
  );
}

export default Profile;
