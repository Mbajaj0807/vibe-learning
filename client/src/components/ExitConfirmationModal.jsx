import { AlertTriangle } from 'lucide-react';

const ExitConfirmationModal = ({ onConfirm, onCancel, currentScore }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 via-blue-950 to-black rounded-2xl p-8 max-w-md w-full shadow-2xl border border-yellow-600">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">Exit Quiz?</h2>
        </div>
        <p className="text-blue-200 mb-4">
          Are you sure you want to exit? Your current score of <span className="font-bold text-yellow-400">{currentScore}</span> will be submitted.
        </p>
        <p className="text-gray-400 text-sm mb-6">This action cannot be undone.</p>

        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg"
          >
            Yes, Exit
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all shadow-lg"
          >
            Continue Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
export default ExitConfirmationModal;