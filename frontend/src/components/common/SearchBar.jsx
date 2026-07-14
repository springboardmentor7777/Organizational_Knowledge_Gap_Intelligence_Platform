import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = 'Search...', onClear, className = '' }) => {
  return (
    <div className={`searchbar-root ${value ? 'has-value' : ''} ${className}`}>
      <Search size={16} className="searchbar-icon" />
      <input
        type="text"
        className="searchbar-input"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <AnimatePresence>
        {value && (
          <motion.button
            className="searchbar-clear"
            onClick={onClear || (() => onChange(''))}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
