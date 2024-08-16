import React from 'react';

function RoleSelectModal({ onClose, onSelectRole }) {
  return (
    <div className="inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 absolute ml-100 ">
      <div className="bg-white p-6 rounded-md shadow-lg">
        <h2 className="text-xl mb-4">Select Your Role</h2>
        <div className="flex flex-col">
          <button
            className="px-4 py-2 mb-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={() => onSelectRole(0)}
          >
            Judge
          </button>
          <button
            className="px-4 py-2 mb-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-600"
            onClick={() => onSelectRole(1)}
          >
            Client
          </button>
          <button
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
            onClick={() => onSelectRole(2)}
          >
            Police
          </button>
        </div>
        <button
          className="mt-4 text-sm text-gray-700 hover:text-gray-900"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default RoleSelectModal;
