import { useState, useEffect } from 'react';
import '../App.css';

export default function Semaine({ ville }) {
    const [previsions, setPrevisions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrevisions = async () => {
            setLoading(true);
            setError(null);

            const apiKey = '75443114d06faae7f4166f4e35d00453';
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${ville}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP : ${response.status}`);
                }
                const data = await response.json();

                // Prévisions par jour
                const groupedPrevisions = data.list.reduce((acc, item) => {
                    const date = new Date(item.dt * 1000).toLocaleDateString();
                    if (!acc[date]) {
                        acc[date] = item; 
                    }
                    return acc;
                }, {});

                setPrevisions(Object.values(groupedPrevisions));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (ville) fetchPrevisions();
    }, [ville]);

    if (loading) return <p>Chargement des prévisions pour {ville}...</p>;
    if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

    return (
        <div>
            <h2 className="semaine-title">Prévisions météo pour {ville} (par semaine)</h2>
            <div className="semaine-container">
                {previsions.map((item, index) => {
                    // jour de la semaine
                    const jour = new Date(item.dt * 1000).toLocaleDateString('fr-FR', { weekday: 'long' });

                    return (
                        <div className="semaine-card" key={index}>
                            <h3>{jour}</h3>
                            <p><strong>Date :</strong> {new Date(item.dt * 1000).toLocaleDateString()}</p>
                            <p><strong>Heure :</strong> {new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            <p><strong>Température :</strong> {item.main.temp} °C</p>
                            <p><strong>Conditions :</strong> {item.weather[0].description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
