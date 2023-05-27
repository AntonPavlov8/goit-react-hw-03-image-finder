import s from './modal.module.css';
export const MovieModal = props => {
  return (
    <div className={s.overlay} onClick={props.closeModal}>
      <div className={s.modal}>
        <img
          src={props.modal.photo[0].largeImageURL}
          className={s.modalImage}
          alt=""
        />
      </div>
    </div>
  );
};
