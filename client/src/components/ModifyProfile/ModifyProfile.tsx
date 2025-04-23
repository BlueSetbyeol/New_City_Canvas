import "./ModifyProfile.css";
import { useContext } from "react";
import LoginContext from "../../contexts/LoginContext";
import { useTheme } from "../../contexts/ThemeContext";
import { ToasterError, ToasterSuccess } from "../../services/ToasterFunctions";

interface infoUserProps {
  infoUser: {
    pseudo: string;
    email: string;
  };
  modifyPopUp: boolean;
  setModifyPopUp: (boolean: boolean) => void;
}

export default function ModifyProfile({
  infoUser,
  modifyPopUp,
  setModifyPopUp,
}: infoUserProps) {
  const { theme } = useTheme();
  const { user } = useContext(LoginContext);

  // Édition de la page profil
  const updateUserProfile = (event: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    event.preventDefault();
    if (infoUser) {
      const formData = new FormData(event.currentTarget);

      const email = formData.get("mail") as string;
      const pseudo = formData.get("pseudo") as string;

      fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ email, pseudo }),
      }).then((response) => {
        if (response.status === 204) {
          ToasterSuccess(
            "Modifications réussies ! Tout est mis à jour, prêt(e) à explorer ! 😎✨",
            theme,
          );
          response.json();
        } else {
          ToasterError(
            "Oups, il y a eu un petit hic ! Un problème est survenu, réessaie un peu plus tard. 😬🔄",
            theme,
          );
        }
      });
    } else {
      ToasterError(
        "Aïe ! Un imprévu est arrivé. Pas de panique, on va régler ça ! 🔧",
        theme,
      );
    }
    setModifyPopUp(false);
  };
  return (
    <>
      <button
        type="button"
        className={modifyPopUp ? "close-btn" : "popup-closed"}
        onClick={() => setModifyPopUp(false)}
      >
        Close
      </button>
      <section className={modifyPopUp ? "popup-sct" : "popup-closed"}>
        <form className="profile-detail" onSubmit={updateUserProfile}>
          <label className="user_label">
            Pseudo
            <input
              aria-label="modifie ton pseudo"
              id="profile-edit-pseudo"
              name="pseudo"
              defaultValue={infoUser.pseudo}
            />
          </label>
          <label className="user_label">
            Mail
            <input
              aria-label="modifie ton adresse mail"
              id="profile-edit-mail"
              name="mail"
              defaultValue={infoUser.email}
            />
          </label>
          <button className="save-btn" type="submit">
            Enregistrer
          </button>
        </form>
      </section>
    </>
  );
}
