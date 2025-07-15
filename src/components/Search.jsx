// import React from 'react';

// const Search = ({ searchItem, setSearchItem, addlist }) => {
//   return (
//     <div>
//       <input
//         placeholder='Search here'
//         value={searchItem}
//         onChange={(e) => setSearchItem(e.target.value)}
//         onKeyDown={addlist}
//       />
//     </div>
//   );
// };

// export default Search;


import React from 'react';

function Search({ searchItem, setSearchItem, addlist }) {
  return (
    <input
      type="text"
      value={searchItem}
      onChange={(e) => setSearchItem(e.target.value)}
      onKeyDown={addlist}
      // onKeyDown={(e) => {
      //   addlist(e);
      //   currentdatetime();
      // }}
      placeholder="Search here"
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-300"
      
    />
  );
}

export default Search;
