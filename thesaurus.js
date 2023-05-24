import React, { useState } from 'react';
import { useQuery } from 'react-query';

const API_URL = 'https://api.datamuse.com/words';

function ThesaurusApp() {
  const [word, setWord] = useState('');
  const { data, isLoading, isError, error, refetch } = useQuery(['synonyms', word], fetchSynonyms);

  const fetchSynonyms = async () => {
    const response = await fetch(`${API_URL}?ml=${word}`);
    return response.json();
  };

  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="thesaurus-app">
      <h1>Thesaurus</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" value={word} onChange={handleInputChange} placeholder="Enter a word" />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}

      {isError && <p>An error occurred: {error.message}</p>}

      {data && (
        <div className="synonyms">
          <h2>Synonyms for "{word}":</h2>
          <ul>
            {data.map((synonym) => (
              <li key={synonym.word}>{synonym.word}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ThesaurusApp;
