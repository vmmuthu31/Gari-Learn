import React from 'react';
import Header from './components/Header';

const Playlist = () => {
  return (
    <>
    <Header />
    <div className=" py-32 px-20 rounded-md shadow-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">My Playlists</h2>
        <button className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">Create New Playlist</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="bg-gray-200 rounded-md p-4">
          <h3 className="text-md font-bold mb-2">Playlist 1</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod porta ligula, eu semper lorem volutpat at.</p>
          <div className="flex items-center justify-end mt-4">
            <button className="text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">View Playlist</button>
          </div>
        </div>
        <div className="bg-gray-200 rounded-md p-4">
          <h3 className="text-md font-bold mb-2">Playlist 2</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod porta ligula, eu semper lorem volutpat at.</p>
          <div className="flex items-center justify-end mt-4">
            <button className="text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">View Playlist</button>
          </div>
        </div>
        <div className="bg-gray-200 rounded-md p-4">
          <h3 className="text-md font-bold mb-2">Playlist 3</h3>
          <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod porta ligula, eu semper lorem volutpat at.</p>
          <div className="flex items-center justify-end mt-4">
            <button className="text-blue-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">View Playlist</button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Playlist;
