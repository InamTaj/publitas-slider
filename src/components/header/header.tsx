import React from 'react';

export const Header = () => (
  <header className="flex flex-row justify-between content-center px-4 py-4 shadow-lg">
    <div>
      <h2 className="text-3xl text-cyan-500 font-bold">publitas</h2>
    </div>
    <div>
      <h2 className="text-3xl text-gray-600">frontend-challenge</h2>
    </div>
    <div>
      <h2 className="text-2xl text-cyan-500">
        <a href="mailto:inamullahtaj@gmail.com">Inam Taj</a>
      </h2>
    </div>
  </header>
);
