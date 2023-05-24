import { useEffect } from 'react';
import { useState } from 'react';
import { HeaderContainer } from './Header/HeaderContainer';
import { Main } from './Main/Main';

export const App = () => {
  const API_KEY = '35001872-49e302eecfa06fa0b9153d71c';

  const [requestData, setRequestData] = useState({ querry: '', total: 0 });
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      console.log(requestData);

      const page = '1';
      try {
        const response = await fetch(
          `https://pixabay.com/api/?key=${API_KEY}&q=${requestData.querry}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setRequestData(prev => ({
          ...prev,
          total: data.total,
        }));
        setPhotos(data.hits);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        console.log(isLoading);
      }
    };
    fetchData();
  }, [requestData.querry]);

  return (
    <div>
      <HeaderContainer setRequestData={setRequestData} />
      <Main photos={photos} isLoading={isLoading} />
    </div>
  );
};
