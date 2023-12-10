import React, { RefObject } from "react";
import whiteSearch from "../../Assets/whiteSearch.png"; // Asegúrate de que esta ruta sea correcta

interface SearchBarProps {
  inputRef: RefObject<HTMLInputElement>;
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearchClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ inputRef, onKeyDown, onSearchClick }) => (
  <div className="top-bar">
    <input
      ref={inputRef}
      type="text"
      className="city-input"
      placeholder="Introduce a city name"
      onKeyDown={onKeyDown}
    />
    <div className="search-icon" onClick={onSearchClick}>
      <img src={whiteSearch} alt="searchIcon" />
    </div>
  </div>
);

export default SearchBar;
