import { useEffect, useState } from 'react';
import { HeaderContainer } from './Header/HeaderContainer';
import { Main } from './Main/Main';

export const App = () => {
  const API_KEY = '35001872-49e302eecfa06fa0b9153d71c';

  const [requestData, setRequestData] = useState({
    querry: '',
    total: 0,
  });
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      if (requestData.querry !== '') {
        currentPage === 1 && setIsLoading(true);

        try {
          const response = await fetch(
            `https://pixabay.com/api/?key=${API_KEY}&q=${requestData.querry}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=12`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          if (currentPage > 1) {
            setPhotos(prev => [...prev, ...data.hits]);
          } else {
            setRequestData(prev => ({
              ...prev,
              total: data.total,
            }));
            setPhotos(data.hits);
          }
        } catch (err) {
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, [requestData.querry, currentPage]);

  return (
    <div>
      <HeaderContainer
        setRequestData={setRequestData}
        setCurrentPage={setCurrentPage}
      />
      <Main
        total={requestData.total}
        photos={photos}
        isLoading={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};
