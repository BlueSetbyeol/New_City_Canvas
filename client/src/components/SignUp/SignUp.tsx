import { useRef, useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { ToasterError, ToasterSuccess } from "../../services/ToasterFunctions";
import "./SignUp.css";
import { Link } from "react-router-dom";

interface SignUpProps {
  setIsRegistered: (boolean: boolean) => void;
  isRegistered: boolean;
}

function SignUp({ setIsRegistered }: SignUpProps) {
  const pseudoRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [conditionsAccepted, setConditionsAccepted] = useState(false);

  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();

    if (
      password.length >= 5 &&
      password === confirmPassword &&
      pseudoRef.current &&
      pseudoRef.current.value.length >= 8 &&
      emailRef.current &&
      emailRef.current.value !== ""
    ) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users`,
          {
            method: "post",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pseudo: (pseudoRef.current as HTMLInputElement).value,
              email: (emailRef.current as HTMLInputElement).value,
              password,
              conditionsAccepted,
            }),
          },
        );

        if (response.status === 201) {
          setIsRegistered(true);
          ToasterSuccess(
            `Bienvenue à bord, ${pseudoRef.current?.value} ! L'aventure Street Art commence maintenant ! 🌟`,
            theme,
          );
          // navigate("/StreetArtMap");
        } else {
          console.info(response);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      ToasterError(
        "Oups ! Tout ne semble pas être juste, réessaye ! 💻🔥",
        theme,
      );
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <section className="signup">
        <label htmlFor="pseudo" className="form-label">
          Pseudo :
          <input
            className="form-input"
            ref={pseudoRef}
            type="pseudo"
            id="pseudo"
            placeholder="5 caractères minimum"
          />
        </label>
        <label htmlFor="email" className="form-label">
          Email :
          <input
            className="form-input"
            ref={emailRef}
            type="email"
            id="email"
          />
        </label>
        <label htmlFor="password" className="form-label">
          Mot de passe :
          <input
            className="form-input"
            type="password"
            id="password"
            placeholder="8 caractères minimum"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <label htmlFor="confirm-password" className="form-label">
          Confirmez votre mot de passe :
          <input
            className="form-input"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </label>
        <label className="conditions">
          <input
            type="checkbox"
            id="conditions-box"
            name="userConditions"
            value="accept"
            onChange={() => setConditionsAccepted(true)}
          />
          J'accepte
          <Link to="/StreetArtMap/TermsAndConditions" target="_blank">
            les conditions d'utilisation
          </Link>
          et
          <Link to="/StreetArtMap/PrivacyPolicy" target="_blank">
            la politique de confidentialité.
          </Link>
        </label>
        <p className="mandatory">Tous les champs sont obligatoire.</p>
      </section>
      <input
        type="submit"
        className="submit-button"
        name="Send"
        value="S'inscrire"
        disabled={!conditionsAccepted}
      />
    </form>
  );
}

export default SignUp;
