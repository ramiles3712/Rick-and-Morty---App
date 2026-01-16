import { motion } from 'framer-motion';

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <motion.div
                className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};
export default Loader;
