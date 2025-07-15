// import React, { useState } from "react";
// import Search from "./components/Search";
// import ReactDOM from "react-dom/client";
// import { createRoot } from "react-dom/client";

// export default function Apps() {
//   const [searchItem, setSearchItem] = useState("");
//   const [filters, setFilters] = useState("all");
//   const [storesearch, setStoresearch] = useState([]);
//   const newDateTime = new Date().toLocaleString(); // fresh timestamp at entry
      
//   const addlist = (e) => {
//   if (e.key === "Enter" && searchItem.trim()) {

//     setStoresearch(
//       storesearch.concat({
//         id: Date.now(),
//         text: searchItem.trim(),
//         completed: false,
//         updatedAt: newDateTime, // save timestamp at creation
//       })
//     );

//     setSearchItem("");
//   }
// };


//   const filtersearch = storesearch.filter((store) => {
//     if (filters === "active") return !store.completed;
//     if (filters === "completed") return store.completed;
//     return true;
//   });

//   const deleteitem = () => {
//     setStoresearch((storesearch) =>
//       storesearch.filter((store) => !store.completed)
//     );
//   };

//   const clearall = () => {
//     setStoresearch([]);
//   };

//   const itemscount =
//     filters === "all"
//       ? storesearch.length
//       : filters === "active"
//       ? storesearch.filter((store) => !store.completed).length
//       : storesearch.filter((store) => store.completed).length;

//   return (
//     <div className="container h-screen w-screen flex items-center justify-center">
//       <div className="bg-white p-14 shadow-lg w-md">
//         <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
//           Todos
//         </h1>

//         <div className="mb-4">
//           <Search
//             searchItem={searchItem}
//             setSearchItem={setSearchItem}
//             addlist={addlist}
            
//           />
           
//         </div>

//         <ul className="space-y-2 mb-4">
//           {filtersearch.map((store) => (
//             <li
//               key={store.id}
//               className="flex items-center bg-gray-100 p-2 rounded shadow-sm"
//             >            
//               <input
//                 type="checkbox"
//                 checked={store.completed}
//                 onChange={() => {
//                   const currentDateTime=new Date().toLocaleString(); 
//                   const updated = storesearch.map((item) =>
//                     item.id === store.id
//                       ? { ...item, completed: !item.completed,updatedAt: currentDateTime }
//                       : item 
//                   );
//                   setStoresearch(updated);
//                 }}

//                 className="mr-3"
//               />
//               <span
//                 className={store.completed ? "line-through text-gray-500" : ""}
//               >
              
//                 {store.text}
//               </span>
//               <span className="text-xs text-gray-500 w-36">
//                   {store.updatedAt ? store.updatedAt : "-"}
//                 </span>
//             </li>
//           ))}
//         </ul>

//         <div className="flex justify-between items-center text-sm mb-3">
//           <span className="text-gray-700">
//             {filters === "all"
//               ? `${itemscount} total items`
//               : filters === "active"
//               ? `${itemscount} active items`
//               : `${itemscount} completed items`}
//           </span>
//           <button onClick={clearall} className="text-red-500 hover:underline">
//             Clear All
//           </button>
//         </div>

//         <div className="flex justify-between space-x-2">
//           <button
//             onClick={() => setFilters("all")}
//             className={`flex-1 py-1 rounded ${
//               filters === "all" ? "bg-indigo-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             All
//           </button>
//           <button
//             onClick={() => setFilters("active")}
//             className={`flex-1 py-1 rounded ${
//               filters === "active" ? "bg-indigo-500 text-white" : "bg-gray-200"
//             }`}
//           >
//             Active
//           </button>
//           <button
//             onClick={() => setFilters("completed")}
//             className={`flex-1 py-1 rounded ${
//               filters === "completed"
//                 ? "bg-indigo-500 text-white"
//                 : "bg-gray-200"
//             }`}
//           >
//             Completed
//           </button>
//           <button
//             onClick={deleteitem}
//             className="flex-1 bg-red-500 text-white py-1 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// const root = createRoot(document.getElementById("root"));
// root.render(<Apps />);


import React, { useState } from "react";
import Search from "./components/Search";
import ReactDOM from "react-dom/client";
import { createRoot } from "react-dom/client";

export default function Apps() {
  const [searchItem, setSearchItem] = useState("");
  const [filters, setFilters] = useState("all");
  const [storesearch, setStoresearch] = useState([]);
  const [startDateTime, setStartDateTime] = useState("");
  const [deadlockDateTime,setdeadlockDateTime]=useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [showFilteredList, setShowFilteredList] = useState(false);
  const newDateTime = new Date().toLocaleString();
  const todayISOString = new Date().toISOString().slice(0, 16);

//console.log(newDateTime);
  const addlist = (e) => {
    if (e.key === "Enter" && searchItem.trim()!== ""  && deadlockDateTime) {
      //const deadlock = deadlockDateTime ? new Date(deadlockDateTime).getTime() : null;
      setStoresearch(
        storesearch.concat({
          id: Date.now(),
          text: searchItem.trim(),
          completed: false,
          updatedAt: deadlockDateTime || newDateTime,
          //createdAt: new Date().toISOString(), // store ISO date for filtering
        })
      );
      setSearchItem("");
      setdeadlockDateTime("");
    }
  };
 

  const deleteitem = () => {
    setStoresearch(storesearch.filter((store) => !store.completed));
  };

  const clearall = () => {
    setStoresearch([]);
  };

  const applyDateFilter = () => {
    setShowFilteredList(true);
  };
  

  const filteredList = storesearch.filter((store) => {
    if (!showFilteredList) return true; // If submit not clicked, show full list

    const itemTime = new Date(store.updatedAt).getTime();
    const startTime = startDateTime ? new Date(startDateTime).getTime() : null;
    const endTime = endDateTime ? new Date(endDateTime).getTime() : null;

    if (startTime && itemTime < startTime) return false;
    if (endTime && itemTime > endTime) return false;
 
    return true;
  }).filter((store) => {
    if (filters === "active") return !store.completed;
    if (filters === "completed") return store.completed;
    return true;
  });

  const itemscount =
    filters === "all"
      ? storesearch.length
      : filters === "active"
      ? storesearch.filter((store) => !store.completed).length
      : storesearch.filter((store) => store.completed).length;

  return (
    <div className="container h-screen w-screen flex items-center justify-center">
      <div className="bg-white p-14 shadow-lg w-md">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Todos
        </h1>
        <div className="grid grid-cols-2 gap-4">
          <Search
            searchItem={searchItem}
            setSearchItem={setSearchItem}
            addlist={addlist}
          />
          <input
            type="datetime-local"
            min={todayISOString}
            value={deadlockDateTime}
            onChange={(e) => {
              const dateValue=e.target.value;
              setdeadlockDateTime(dateValue);
            }}
            className="border p-2 rounded w-full mb-2"
          />  
          {/* <input
            type="datetime-local"
            min={todayISOString}
            value={deadlockDateTime}
            onChange={(e) => {
              const dateValue = e.target.value;
              setdeadlockDateTime(dateValue);

              if (searchItem.length>0 && searchItem.trim() && dateValue) {
                setStoresearch((prev) =>
                  prev.concat({
                    id: Date.now(),
                    text: searchItem.trim(),
                    completed: false,
                    updatedAt: dateValue,
                  })
                );
                setSearchItem("");         // clear input after adding
                setdeadlockDateTime("");   // clear date input after adding
              }
            }}
            className="border p-2 rounded w-full mb-2"
          />  */}

        </div>

        {/* Date-Time Filter Inputs */}
        <div className="mb-4 ">
          <div className="grid grid-cols-2 gap-4">
          <div >
          <label className="block mb-1 font-medium text-sm text-gray-700">
            Start Date & Time:
          </label>
          <input
            type="datetime-local"
            min={todayISOString}
            value={startDateTime}
            onChange={(e) => {
              setStartDateTime(e.target.value);
              if (endDateTime && new Date(e.target.value) > new Date(endDateTime)) {
                setEndDateTime("");  // Reset end date if now invalid
              }
            }}
            className="border p-2 rounded w-full mb-2"
          />
          </div>
          <div>
          <label className="block mb-1 font-medium text-sm text-gray-700">
            End Date & Time:
          </label>
          <input
            type="datetime-local"
            min={startDateTime || todayISOString}
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            className="border p-2 rounded w-full mb-2"
          />
          </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
          <button
            onClick={applyDateFilter}
            className="bg-green-500 text-white py-2 px-4 rounded w-full mt-12"
            disabled={!startDateTime || !endDateTime}
          >
            Submit Date Filter
          </button>
          <button
            onClick={() => {
              setStartDateTime("");
              setEndDateTime("");
              setShowFilteredList(false);
            }}
            className="bg-gray-500 text-white py-2 px-4 rounded w-full mt-12"
          >
            Clear Date Filter
          </button>
          </div>
        </div>

        {/* Filtered Todo List */}
        <ul className="space-y-2 mb-4">
          {filteredList.length === 0 ? (
            <p className="text-sm text-gray-400">No tasks in selected filters.</p>
          ) : (
            filteredList.map((store) => (
              <li
                key={store.id}
                className="flex items-center bg-gray-100 p-2 rounded shadow-sm"
              >
                <input
                  type="checkbox"
                  checked={store.completed}
                  onChange={() => {

                   //const currentDateTime = new Date().toLocaleString();
                   //if(searchItem.length>0){
                    const updated = storesearch.map((item) =>
                      item.id === store.id
                        ? {
                            ...item,
                            completed: !item.completed,
                           // updatedAt: currentDateTime,
                          }
                        : item
                    );
                    setStoresearch(updated);
                  }}//}
                  className="mr-3"
                />
                <span
                  className={store.completed ? "line-through text-gray-500" : ""}
                >
                  {store.text}
                </span>
                {/* <span className="text-xs text-gray-500 w-36 ml-auto text-right">
                  {store.updatedAt ? store.updatedAt : "-"}
                </span> */}
                <span className="text-xs text-gray-500 w-36 ml-auto text-right">
                  {store.updatedAt
                    ? new Date(store.updatedAt).toLocaleString('en-US', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: false
                      })
                    : "-"}
                </span>

              </li>
            ))
          )}
        </ul>

        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-gray-700">
            {filters === "all"
              ? `${itemscount} total items`
              : filters === "active"
              ? `${itemscount} active items`
              : `${itemscount} completed items`}
          </span>
          <button onClick={clearall} className="text-red-500 hover:underline">
            Clear All
          </button>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex justify-between space-x-2">
          <button
            onClick={() => setFilters("all")}
            className={`flex-1 py-1 rounded ${
              filters === "all" ? "bg-indigo-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilters("active")}
            className={`flex-1 py-1 rounded ${
              filters === "active" ? "bg-indigo-500 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilters("completed")}
            className={`flex-1 py-1 rounded ${
              filters === "completed"
                ? "bg-indigo-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Completed
          </button>
          <button
            onClick={deleteitem}
            className="flex-1 bg-red-500 text-white py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<Apps />);
