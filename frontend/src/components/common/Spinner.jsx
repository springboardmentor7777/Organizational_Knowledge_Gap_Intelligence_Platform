import './Spinner.css';

const Spinner = ({ size = 'md', color = 'purple', className = '' }) => {
  return (
    <div className={`spinner spinner-${size} spinner-${color} ${className}`} role="status" aria-label="Loading">
      <div className="spinner-ring" />
      <div className="spinner-ring spinner-ring-inner" />
    </div>
  );
};

export default Spinner;
