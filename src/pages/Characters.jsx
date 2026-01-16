import { useState } from 'react';
import useCharacters from '../hooks/useCharacters';
import CharacterCard from '../components/UI/CharacterCard';
import SearchBar from '../components/UI/SearchBar';
import Loader from '../components/UI/Loader';
import { motion } from 'framer-motion';
import useTitle from '../hooks/useTitle';

const Characters = () => {
  useTitle('Characters');
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data, loading, error } = useCharacters(page, { name: searchTerm });
  const { results, info } = data || {};

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1); 
  };

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

  return (
    <div>
       <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-4">
          Meet the cast
        </h2>
        <SearchBar value={searchTerm} onChange={handleSearch} />
      </motion.div>

      {loading && <Loader />}
      
      {error && !loading && (
        <div className="text-center text-red-500">
            Error loading characters.
        </div>
      )}

      {!loading && !error && results?.length === 0 && (
          <div className="text-center text-gray-400">No characters found.</div>
      )}

      {!loading && !error && results?.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((char) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>

          <div className="flex justify-center items-center mt-12 space-x-4">
            <button
              onClick={handlePrev}
              disabled={!info?.prev}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                !info?.prev
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Previous
            </button>
            <span className="text-gray-400">Page {page} of {info?.pages || 1}</span>
            <button
              onClick={handleNext}
              disabled={!info?.next}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                 !info?.next
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default Characters;
