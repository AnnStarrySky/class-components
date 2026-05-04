import React from 'react';
import Search from '../Search/Search';
import Results from '../Results/Results';

class Layout extends React.Component {
  state = {
    searchQuery: localStorage.getItem('searchQuery') || ''
  };

  handleSearch = (value: string) => {
    this.setState({ searchQuery: value });
    localStorage.setItem('searchQuery', value);
  };

  render() {
    return (
      <div className="max-w-[1400px] min-h-screen flex flex-col mx-auto">
        <header className="p-4 bg-gray-100">
          <Search onSearch={this.handleSearch} initialValue={this.state.searchQuery} />
        </header>
        <main className="flex-1 p-4">
          <Results searchQuery={this.state.searchQuery} />
        </main>
      </div>
    );
  }
}

export default Layout;