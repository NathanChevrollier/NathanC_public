import './App.css';
import Heures from './components/heures';
import Semaine from './components/semaine';
import Formulaire from './components/formulaire';

import { useState } from 'react';

function App() {
  const [affichage, setAffichage]= useState(false);
  const [ville, setVille] = useState('');

  const villeSubmit = (villeSaisie) => {
    setVille(villeSaisie);
  }

  const changeAffichage = () => {
    setAffichage( (val) => !val )
  }

  return (
    <div className="App">
            <h1>MÉTÉO</h1>
            <button onClick={changeAffichage}>
                Passer en affichage par {affichage ? 'heures' : 'semaine'}
            </button>
            <Formulaire onsubmit={villeSubmit} />
            {ville ? (
                affichage ? (
                    <Semaine ville={ville} />
                ) : (
                    <Heures ville={ville} />
                )
            ) : (
                <p>Veuillez entrer une ville pour voir la météo.</p>
            )}
        </div>
  );
}

export default App;