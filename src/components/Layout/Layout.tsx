import React from 'react';
import Search from '../Search/Search';
import Results from '../Results/Results';
import ErrorSimulator from '../ErrorBoundary/ErrorSimulator';

class Layout extends React.Component {
  state = {
    searchQuery: localStorage.getItem('searchQuery') || ''
  };

  handleSearch = (value: string) => {
  const trimmed = value.trim();

  if (trimmed === this.state.searchQuery) return;

  this.setState({ searchQuery: trimmed });
  localStorage.setItem('searchQuery', trimmed);
};

  render() {
    return (
      <div className="max-w-[1400px] min-h-screen flex flex-col mx-auto">
        <header className="p-4 bg-gray-100">
          <Search onSearch={this.handleSearch} initialValue={this.state.searchQuery} />
        </header>
        <main className="flex-1 p-4">
          <ErrorSimulator />
          <Results searchQuery={this.state.searchQuery} />
        </main>
      </div>
    );
  }
}

export default Layout;