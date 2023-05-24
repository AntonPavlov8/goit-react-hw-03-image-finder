import s from './main.module.css';

export const Main = props => {
  return props.isLoading ? (
    <span className={s.preloader}>Loading...</span>
  ) : (
    <div className={s.photoList}>
      {props.photos.map(photo => (
        <div key={photo.id}>
          <img src={photo.largeImageURL} />
        </div>
      ))}
    </div>
  );
};
