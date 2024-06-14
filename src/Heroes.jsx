import React from 'react';
import { useState, useEffect } from 'react';
import Card from './assets/Card';
import md5 from 'blueimp-md5';


function Heroes() {
  const [heroes, setHeroes] = useState([])
  const publicKey = '82e0ce95e2c2cdaaaa85a7cceeff472b';
  const privateKey = '3d1f98edbc0031c9a6b7437540e739fe87d15bbb';
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);

  useEffect(() => {
    const check = async () => {
      const data = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`)
      const datos = await data.json()
      setHeroes(datos.data.results)
      console.log(datos.data.results[0].comics.collectionURI)
    }
    check()
  }, []);

  return (
    <>
      <div className='title'>
        <label htmlFor="">SUPER HEROES</label>
      </div>

      <div className='row g-4 m-0'>
        {
          heroes.length > 0 ?
            heroes.map((heroe, index) => (
              <Card key={index} name={heroe.name} img={heroe.thumbnail.path + '.' + heroe.thumbnail.extension} comics={heroe.comics.collectionURI} />
            ))
            : <p>Cargando...</p>
        }
      </div>
    </>
  )
}

export default Heroes;



