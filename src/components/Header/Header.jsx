import s from './header.module.css';

export const Header = props => {
  return (
    <div className={s.header}>
      <form className={s.searchForm} onSubmit={props.searchFn}>
        <input
          className={`${s.searchInput}  ${
            props.isSearching ? s.activeInput : ''
          }`}
          name="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images..."
          onChange={props.onInput}
        />
        <button
          type="submit"
          disabled={props.isSearching ? false : true}
          className={`${s.searchBt}  ${props.isSearching ? s.activeBt : ''}`}
        >
          Search
        </button>
      </form>
    </div>
  );
};
