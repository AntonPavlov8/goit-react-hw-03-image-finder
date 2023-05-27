import { useState } from 'react';
import { Header } from './Header';

export const HeaderContainer = props => {
  const [isSearching, setIsSearching] = useState(false);

  function onInput(e) {
    if (e.target.value.trim() !== '') {
      setIsSearching(true);
    } else setIsSearching(false);
  }

  function searchFn(e) {
    e.preventDefault();
    const userInput = e.target.elements.input.value;
    props.setCurrentPage(1);
    props.setRequestData(prev => ({
      ...prev,
      querry: userInput,
    }));
  }

  return (
    <Header isSearching={isSearching} onInput={onInput} searchFn={searchFn} />
  );
};
