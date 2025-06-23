import React, { useEffect, useState } from 'react';
import { getCards } from '../services/cards';
import Card from '../components/Card';

const Dashboard = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    getCards().then(setCards);
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Wissenskarten</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card: any) => (
          <Card key={card._id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
