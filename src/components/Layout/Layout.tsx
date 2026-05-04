import React from 'react';
import Search from '../Search/Search';
import Results from '../Results/Results';

class Layout extends React.Component {
  render() {
    return (
      <div className="max-w-[1400px] min-h-screen flex flex-col mx-auto">
        <header className="p-4 bg-gray-100">
          <Search />
        </header>
        <main className="flex-1 p-4">
          <Results />
        </main>
      </div>
    );
  }
}

export default Layout;