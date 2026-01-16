import { useState } from 'react';
import useEpisodes from '../hooks/useEpisodes';
import Loader from '../components/UI/Loader';
import { motion } from 'framer-motion';
import Container from '../components/Layout/Container';
import useTitle from '../hooks/useTitle';

const Episodes = () => {
    useTitle('Episodes');
    const [page, setPage] = useState(1);
    const { data, loading, error } = useEpisodes(page);
    const { results, info } = data || {};

    const handleNext = () => setPage((prev) => prev + 1);
    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));

    return (
        <Container>
            <motion.h2 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text mb-8 text-center"
            >
                Episodes
            </motion.h2>

            {loading && <Loader />}
            {error && <div className="text-red-500 text-center">Error loading episodes</div>}

            {!loading && !error && (
                <>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {results?.map((episode) => (
                            <motion.div
                                key={episode.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-800 p-6 rounded-lg border border-gray-700 hover:border-green-500 transition-colors"
                            >
                                <h3 className="text-xl font-bold text-white mb-2">{episode.name}</h3>
                                <p className="text-green-400 font-mono mb-2">{episode.episode}</p>
                                <p className="text-gray-400 text-sm">{episode.air_date}</p>
                            </motion.div>
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
        </Container>
    );
};
export default Episodes;
