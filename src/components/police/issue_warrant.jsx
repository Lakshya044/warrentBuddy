// Frontend function to handle updating warrant visibility
import { useState } from 'react';

export default function UpdateWarrantVisibility() {
  const [warrantId, setWarrantId] = useState('');
  const [visibleToUser, setVisibleToUser] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleVisibilityChange = (e) => {
    setVisibleToUser(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!warrantId) {
      setError('Warrant ID is required.');
      return;
    }

    try {
      const response = await fetch('/api/update/warrantVisibility', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ warrantId, visibleToUser }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message);
        setError('');
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
        setMessage('');
      }
    } catch (err) {
      console.error('Error updating visibility:', err);
      setError('Server error, please try again later.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4 sm:px-2 lg:px-4">
      <div className="max-w-md w-full space-y-5">
        <h2 className="mt-1 text-center text-3xl font-extrabold text-gray-900">
          Update Warrant Visibility
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded p-4 mb-4">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 border border-green-300 rounded p-4 mb-4">
            {message}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="warrantId" className="block text-sm font-medium text-gray-700">Warrant ID</label>
            <input
              id="warrantId"
              name="warrantId"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter Warrant ID"
              value={warrantId}
              onChange={(e) => setWarrantId(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="visibleToUser" className="block text-sm font-medium text-gray-700">Visible to User</label>
            <input
              id="visibleToUser"
              name="visibleToUser"
              type="checkbox"
              checked={visibleToUser}
              onChange={handleVisibilityChange}
              className="mt-1"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Visibility
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
