import { MovieModal } from 'components/modal/Modal';
import { useState } from 'react';
import s from './main.module.css';

export const Main = props => {
  const [modal, setModal] = useState({
    isOpened: false,
    photo: '',
  });

  function loadMore() {
    props.setCurrentPage(props.currentPage + 1);
  }

  function openModal(e) {
    if (e.target.closest('div').getAttribute('id')) {
      const photoId = e.target.closest('div').getAttribute('id');

      setModal({ isOpened: true, photo: getPhoto(photoId) });
    } else return;
  }
  function closeModal(e) {
    e.stopPropagation();

    setModal({ isOpened: false, photo: '' });
  }

  function getPhoto(movieId) {
    const gg = props.photos.filter(movie => movie.id == movieId);
    return gg;
  }

  function render() {
    return (
      <div>
        {modal.isOpened && (
          <MovieModal
            modal={modal}
            setModal={setModal}
            closeModal={closeModal}
          />
        )}
        <div className={s.photoList} onClick={openModal}>
          {props.photos.map((photo, i) => (
            <div key={i} className={s.photoListItem} id={photo.id}>
              <img src={photo.largeImageURL} alt="" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return props.isLoading ? (
    <span className={s.preloader}>Loading...</span>
  ) : (
    props.photos.length !== 0 && (
      <div>
        {render()}
        {props.photos.length < props.total && (
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <div className={s.loadMore} onClick={loadMore}>
              Load More
            </div>
          </div>
        )}
      </div>
    )
  );
};
