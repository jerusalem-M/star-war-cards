   import React, { useState } from 'react';
import './ActorList.css'; 
import ActorCard from './ActorCard';
import ActorDetail from './ActorDetail';  
import { useFetchActorsQuery } from '../api/slices/actorSlice';

const ActorList = () => {
  const { data: actors, error, isLoading } = useFetchActorsQuery();
  const [selectedActor, setSelectedActor] = useState(null);

  if (isLoading) {
    return <p className="loading">Loading actors...</p>;
  }

  if (error) {
    return <p className="error">Error loading actors: {error.message || 'Something went wrong.'}</p>;
  }

  const handleActorSelect = (actor) => {
    setSelectedActor(actor); 
  };

  return (
    <div className="actor-list">
      <h1 className="actor-list-title">Star Wars Actors</h1>
      
      {/* Render all actors directly, let CSS grid handle columns */}
      {actors?.results.map((actor) => (
        <ActorCard 
          key={actor.name} 
          actor={actor} 
          onSelect={() => handleActorSelect(actor)} 
        />
      ))}

      {selectedActor && (
        <>
          <div className="overlay"></div>
          <ActorDetail actor={selectedActor} onClose={() => setSelectedActor(null)} />
        </>
      )}
    </div>
  );
};

export default ActorList;
