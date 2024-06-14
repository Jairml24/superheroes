import React, { useState, useEffect } from 'react';
import Card from './assets/Card';
import md5 from 'blueimp-md5';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function HeroesDetalle() {
  const [heroesDetalle, setHeroesDetalle] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const publicKey = '82e0ce95e2c2cdaaaa85a7cceeff472b';
  const privateKey = '3d1f98edbc0031c9a6b7437540e739fe87d15bbb';
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);
  const navigate = useNavigate();
  const location = useLocation();
  const { comics, name } = location.state || {};

  useEffect(() => {
    const fetchData = async () => {
      if (!comics) {
        navigate('/');
        return;
      }
      try {
        const response = await fetch(`${comics}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
        const data = await response.json();
        setHeroesDetalle(data.data.results);
        setIsLoading(false); // Terminar la carga cuando se reciben los datos
      } catch (error) {
        setError('Failed to fetch data'); // Manejo de error
        setIsLoading(false); // Terminar la carga incluso si hay un error
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className='title'>
        <label htmlFor="">
          <Link className='link' to={`/`}>SUPER HEROES</Link>/{name}
        </label>
      </div>
      <div className='row g-4 m-0'>
        {isLoading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p> // Mostrar mensaje de error si ocurre
        ) : heroesDetalle.length > 0 ? (
          heroesDetalle.map((heroe, index) => (
            <Card key={index} name={heroe.title} img={`${heroe.thumbnail.path}.${heroe.thumbnail.extension}`} />
          ))
        ) : (
          <p>Sin datos</p> // Mostrar mensaje si no hay datos
        )}
      </div>
    </>
  );
}

export default HeroesDetalle;

