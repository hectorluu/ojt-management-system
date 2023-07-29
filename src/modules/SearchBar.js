import React from "react";

const SearchBar = ({ onClickSearch = () => { } }) => {
  const [search, setSearch] = React.useState("");
  return (
    <div className="relative z-50">
      <div className="bg-white rounded-full shadow-[10px_10px_20px_rgba(218,_213,_213,_0.15)] drop-shadow-2xl p-2 w-full flex items-center ">
        <div className="flex-1 px-5">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full text-sm bg-transparent placeholder:text-text4 text-text1"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button
          className="w-[72px] rounded-full bg-primary text-white h-10 flex items-center justify-center flex-shrink-0"
          onClick={() => onClickSearch(search)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
