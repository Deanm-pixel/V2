import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ card }: { card: any }) => {
  return (
    <Link to={`/card/${card._id}`} className="block border p-4 hover:bg-gray-50">
      <h2 className="text-lg font-bold">{card.title}</h2>
      <p className="text-sm text-gray-600">{card.tags.join(', ')}</p>
    </Link>
  );
};

export default Card;
