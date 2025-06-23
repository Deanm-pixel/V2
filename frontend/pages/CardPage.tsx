import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCardById } from '../services/cards';
import { getComments, addComment } from '../services/comments';

const CardPage = () => {
  const { id } = useParams();
  const [card, setCard] = useState<any>(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    getCardById(id!).then(setCard);
    getComments(id!).then(setComments);
  }, [id]);

  const handleComment = async () => {
    await addComment(id!, text);
    setText('');
    getComments(id!).then(setComments);
  };

  if (!card) return <p>Lade...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{card.title}</h1>
      <p className="mt-2">{card.content}</p>
      <div className="mt-4">
        <h2 className="font-semibold">Kommentare</h2>
        <ul className="space-y-2 mt-2">
          {comments.map((c: any) => (
            <li key={c._id} className="border p-2">{c.user.username}: {c.text}</li>
          ))}
        </ul>
        <div className="mt-4">
          <textarea className="w-full border p-2" value={text} onChange={e => setText(e.target.value)} />
          <button className="bg-blue-500 text-white px-4 py-2 mt-2" onClick={handleComment}>Kommentieren</button>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
