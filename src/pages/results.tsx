import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Import useRouter

interface SearchResult {
  link: string;
  title: string;
  description: string;
}

const Results = () => {
  const router = useRouter();
  const query = Array.isArray(router.query.query) ? router.query.query[0] : router.query.query || ''; // Default to empty string
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      setError(null);
      fetch(`/api/search?query=${encodeURIComponent(query)}`)
        .then((response) => {
          const contentType = response.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            throw new Error('Invalid response format');
          }
          return response.json();
        })
        .then((data) => {
          setResults(data.results);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setError('Failed to fetch results. Please try again later.');
          setIsLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Results for: "{query}"</h2>
      {isLoading ? (
        <p className="text-gray-600">Loading results...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <ul className="space-y-4">
          {results.map((result, index) => (
            <li key={index} className="p-4 border border-gray-200 rounded-lg shadow hover:shadow-lg transition-shadow duration-200">
              <a href={result.link} className="text-blue-600 hover:underline">
                <h3 className="text-lg font-semibold">{result.title}</h3>
              </a>
              <p className="text-gray-700">{result.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;