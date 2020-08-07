import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBox = ({ query, setQuery, Search }) => {
  return (
    <div className='search-box'>
      <div className='icon' onClick={() => Search("Enter")}>
        <BsSearch />
      </div>
      <input
        type='text'
        placeholder='Search by city name'
        value={query}
        className='search-field'
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={Search}
      />
    </div>
  );
};

export default SearchBox;
