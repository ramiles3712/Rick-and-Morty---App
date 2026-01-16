import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCharacterById } from '../services/api';
import Loader from '../components/UI/Loader';
import { motion } from 'framer-motion';
import useTitle from '../hooks/useTitle';

const CharacterDetail = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useTitle(character ? character.name : 'Character Details');

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const data = await getCharacterById(id);
        setCharacter(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-500">Error loading character.</div>;
  if (!character) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <Link to="/characters" className="inline-flex items-center text-green-400 hover:text-green-300 mb-6 transition-colors">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Characters
      </Link>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700 md:flex"
      >
        <div className="md:w-1/2">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-white mb-2">{character.name}</h1>
          <div className="flex items-center mb-6">
            <span
              className={`w-3 h-3 rounded-full mr-2 ${
                character.status === 'Alive'
                  ? 'bg-green-500'
                  : character.status === 'Dead'
                  ? 'bg-red-500'
                  : 'bg-gray-500'
              }`}
            ></span>
            <span className="text-lg text-gray-300">
              {character.status} - {character.species}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-gray-500 block text-sm">Gender</span>
              <span className="text-xl text-gray-200">{character.gender}</span>
            </div>
            <div>
              <span className="text-gray-500 block text-sm">Last known location</span>
              <span className="text-xl text-gray-200">{character.location?.name}</span>
            </div>
             <div>
              <span className="text-gray-500 block text-sm">First seen in</span>
              <span className="text-xl text-gray-200">{character.origin?.name}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CharacterDetail;
