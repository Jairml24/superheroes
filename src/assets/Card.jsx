import React from 'react';
import './Card.css'
import { Link } from 'react-router-dom'

function Card({ name, img, comics = '' }) {
  return (
    <div className='card col-12 col-md-3'>
      {
        comics==''?
        <>
            <img src={img} alt="" />
            <p>{name}</p>
            </>
          :
          <Link to={`/superheroe`} state={{ comics: comics, name: name }}>
            <img src={img} alt="" />
            <p>{name}</p>
          </Link>
      }
    </div>
  )
}

export default Card;
