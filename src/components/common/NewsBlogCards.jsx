// import React from "react";
// import { useGetNewsQuery } from "../../services/endpoints/newsBlogs";

// const NewsBlogCards = () => {
//   const { data: newsList = [], isLoading } = useGetNewsQuery();

//   if (isLoading) {
//     return <p className="text-center py-10">Loading...</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//       {newsList.slice(0, 2).map((item, index) => (
//         <div
//           key={item._id}
//           className={`group animate-[fadeUp_${index === 0 ? "0.9" : "1.1"}s_ease-out]`}
//         >
//           {/* IMAGE */}
//           <div className="relative rounded-2xl overflow-hidden mb-5">
//             <img
//               src={item.image}
//               alt={item.title}
//               className="
//                 w-full
//                 h-70
//                 object-cover
//                 blur-[2px]
//                 transition-all
//                 duration-300
//                 group-hover:scale-105
//               "
//             />

// <span
//   className="
//     absolute top-4 left-4
//     bg-[#309689] text-white
//     text-sm md:text-base
//     px-6 py-2
//     rounded-full
//     font-semibold
//     shadow-md
//   "
// >
//               {item.type}
//             </span>
//           </div>

//           {/* DATE */}
//           <p className="text-gray-400 text-sm mb-2">
//             {new Date(item.createdAt).toLocaleDateString("en-IN", {
//               day: "2-digit",
//               month: "long",
//               year: "numeric",
//             })}
//           </p>

//           {/* TITLE */}
//           <h3 className="text-xl font-semibold mb-4 leading-snug">
//             {item.title}
//           </h3>

//           {/* BUTTON */}
//           <button className="text-[#309689] font-medium flex items-center gap-2 hover:gap-3 transition-all">
//             Read more <span>→</span>
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NewsBlogCards;
