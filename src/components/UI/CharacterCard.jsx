import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CharacterCard = ({ character }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:shadow-green-500/20 transition-shadow duration-300"
    >
      <Link to={`/characters/${character.id}`}>
        <div className="relative">
          <img
            src={character.image}
            alt={character.name}
            className="w-full h-64 object-cover"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <span
              className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                character.status === 'Alive'
                  ? 'bg-green-500 text-white'
                  : character.status === 'Dead'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-500 text-white'
              }`}
            >
              {character.status}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-1 truncate">{character.name}</h3>
          <p className="text-gray-400 text-sm mb-4">{character.species} - {character.gender}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
            <span className="truncate">Last known location:</span>
          </div>
          <p className="text-gray-300 text-sm truncate">{character.location.name}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CharacterCard;
