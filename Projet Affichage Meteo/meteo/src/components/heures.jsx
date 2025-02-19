import { useState, useEffect } from 'react';
import '../App.css';

export default function Heures({ ville }) {
    const [previsions, setPrevisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const lang = 'fr';

    useEffect(() => {
        const fetchPrevisions = async () => {
            setLoading(true);
            setError(null);

            const apiKey = '75443114d06faae7f4166f4e35d00453';
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apiKey}&units=metric&lang=${lang}`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const data = await response.json();

                // prévisions uniquement aujourd'hui
                const today = new Date().toLocaleDateString(); // Date d'aujourd'hui
                const filteredPrevisions = data.list.filter((item) => {
                    const date = new Date(item.dt * 1000).toLocaleDateString(); // Date de la prévision
                    return date === today;
                });

                setPrevisions(filteredPrevisions);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (ville) fetchPrevisions();
    }, [ville]);

    if (loading) return <p>Chargement des prévisions horaires pour {ville}...</p>;
    if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

    return (
        <div>
            <h2 className="heure-title">Prévisions horaires pour {ville}</h2>
            <div className="heure-container">
                {previsions.map((item, index) => (
                    <div className="heure-card" key={index}>
                        <p><strong>Heure :</strong> {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p><strong>Température :</strong> {item.main.temp} °C</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                            alt={item.weather[0].description}
                            className="weather-icon"
                        />
                        <p><strong>Conditions :</strong> {item.weather[0].description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
