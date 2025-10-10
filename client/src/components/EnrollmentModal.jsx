import { useState } from 'react';

const EnrollmentModal = ({ onSubmit, onClose, initialEnrollment }) => {
  const [enrollment, setEnrollment] = useState(initialEnrollment || '');

  const handleSubmit = () => {
    if(enrollment.slice(0,6).toLowerCase() != 'e23cseu' && enrollment.length != 11) {
      alert('Please enter a valid enrollment number.');
      return;
    }
    if (enrollment.trim()) {
      const formattedEnrollment = enrollment.trim().toUpperCase();
      onSubmit(formattedEnrollment);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black rounded-2xl p-8 max-w-md w-full shadow-2xl border border-blue-700">
        <h2 className="text-2xl font-bold text-white mb-2">Enter Your Enrollment Number</h2>
        <p className="text-blue-300 mb-6">Used to record and track your quiz scores</p>

        <input
          type="text"
          value={enrollment}
          onChange={(e) => setEnrollment(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., 21BCE1234"
          className="w-full px-4 py-3 border-2 border-blue-600 bg-gray-900 text-white rounded-lg focus:border-blue-400 focus:outline-none text-lg mb-4 placeholder-gray-500"
          autoFocus
        />

        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
          >
            Continue
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all shadow-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentModal;