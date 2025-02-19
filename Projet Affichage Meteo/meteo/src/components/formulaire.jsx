import { useState } from "react";
import '../App.css'

export default function Formulaire({ onsubmit }) {
    const [ville, setVille] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (onsubmit) onsubmit(ville);
        setVille('');
    };

    return (
        <form onSubmit={handleSubmit} className="formulaire-container">
            <h3 className="formulaire-title">Entrer le nom de la ville :</h3>
            <div className="formulaire-input-group">
                <input
                    type="text"
                    value={ville}
                    onChange={(event) => setVille(event.target.value)}
                    placeholder="exemple : Angers"
                    className="formulaire-input"
                />
                <button type="submit" className="formulaire-button">Envoyer</button>
            </div>
        </form>
    );
}
