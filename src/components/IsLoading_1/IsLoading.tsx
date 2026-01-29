import { type FC } from "react";
import "./IsLoading.scss";


// flipping cards
// const IsLoading: FC = () => {
//   return (
//     <>
//       <div className="isLoading">

//         <div className="grid">
//           <article className="card">
//             <div className="box">
//               <div className="loader" aria-label="Loading">
//                 <i></i>
//                 <i></i>
//                 <i></i>
//                 <i></i>
//               </div>
//             </div>
//           </article>
//         </div>

//       </div>
//     </>
//   )};



// three rotating squares
// const IsLoading: FC = () => {
//   return (
//     <>
//       <div className="isLoading">

//         <div className="container">
//           <div className="square square1"></div>
//           <div className="square square2"></div>
//           <div className="square square3"></div>
//         </div>
//       </div>
//     </>
//   )};



// three ball wave line
// const IsLoading: FC = () => {
  // return (
  //   <>
  //     <div className="isLoading">
        
  //       <div className="anim-area">
  //         <div className="circle ud1"></div>
  //         <div className="circle ud2"></div>
  //         <div className="circle ud3"></div>
  //       </div>

  //     </div>
  //   </>
  // )};



// 4 square square pulse thing
// const IsLoading: FC = () => {
  // return (
  //   <>
  //     <div className="isLoading">

  //       <div className="container">
  //         <div className="sub"></div>
  //         <div className="sub"></div>
  //         <div className="sub"></div>
  //         <div className="sub"></div>
  //       </div>
  //     </div>
  //   </>
  // )};




// flipping square
// const IsLoading: FC = () => {
  // return (
  //   <>
  //     <div className="isLoading">

  //       <div className="spinner"></div>

  //     </div>
  //   </>
  // )};




// pusling circle thing
// const IsLoading: FC = () => {
  // return (
  //   <>
  //     <div className="isLoading">


  //       <div className="double-spinner item">
  //         <div></div>
  //         <div></div>
  //       </div>

  //     </div>
  //   </>
  // )};





// four pulsing rotating balls
// const IsLoading: FC = () => {
  // return (
  //   <>
  //     <div className="isLoading">

  //         <div className="container">
  //           <div className="box box-one"></div>
  //           <div className="box box-two"></div>
  //           <div className="box box-three"></div>
  //           <div className="box box-four"></div>
  //         </div>

  //     </div>
  //   </>
  // )};




// four pulsing rotating balls
// const IsLoading: FC = () => {
  // return (
  //   <>
  //     <div className="isLoading">

  //      <div className="loader"></div>

  //     </div>
  //   </>
  // )};





// circle with halo thing
// const IsLoading: FC = () => {
//   return (
//     <>
//       <div className="isLoading">

//         <div className="center-body">
//           <div className="loader-circle-5"></div>
//         </div>

//       </div>
//     </>
//   )};





// shifting cubes
// const IsLoading: FC = () => {
//   return (
//     <>
//       <div className="isLoading">

//         <div className="container">
//           <svg width="100" height="100" viewBox="0 0 300 300">
//             <defs>
//               <linearGradient id="gradient-fill" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="300" y2="0">
//                 <stop offset="0%">
//                   <animate attributeName="stop-color" values="#00E06B;#CB0255;#00E06B" dur="5s" repeatCount="indefinite" />
//                 </stop>
//                 <stop offset="100%">
//                   <animate attributeName="stop-color" values="#04AFC8;#8904C5;#04AFC8" dur="8s" repeatCount="indefinite" />
//                 </stop>
//               </linearGradient>
//               <clipPath id="clip">
//                 <rect className="square s1" x="0" y="0" rx="12" ry="12" height="90" width="90"></rect>
//                 <rect className="square s2" x="100" y="0" rx="12" ry="12" height="90" width="90"></rect>
//                 <rect className="square s3" x="200" y="0" rx="12" ry="12" height="90" width="90"></rect>
//                 <rect className="square s4" x="0" y="100" rx="12" ry="12" height="90" width="90"></rect>
//                 <rect className="square s5" x="200" y="100" rx="12" ry="12" height="90" width="90"></rect>
//                 <rect className="square s6" x="0" y="200" rx="12" ry="12" height="90" width="90"></rect>
//                 <rect className="square s7" x="100" y="200" rx="12" ry="12" height="90" width="90"></rect>
//               </clipPath>
//             </defs>
//             <rect className="gradient" clip-path="url('#clip')" height="300" width="300"></rect>
//           </svg>
//         </div>

//       </div>
//     </>
//   )};



// bubbling circle thing
// const IsLoading: FC = () => {
//   return (
//     <>
//       <div className="isLoading">

//         <div className="frame">
//           <div className="center">
//               <div className="dot-1"></div>
//               <div className="dot-2"></div>
//               <div className="dot-3"></div>
//           </div>
//         </div>

//       </div>
//     </>
//   )};






  // four balls spinning and merging
// const IsLoading: FC = () => {
//   return (
//     <>
//       <div className="isLoading">

//         <div className="loader"></div>

//       </div>
//     </>
//   )};





  // four balls spinning and merging
// const IsLoading: FC = () => {
//   return (
//     <>
//       <div className="isLoading">

//         <div className="wrapper">
//           <ul className="loader-list">
//             <li>
//               <div className="loader-5 center"><span></span></div>
//             </li>
//           </ul>
//       </div>

//       </div>
//     </>
//   )};





  // rubix cube thing
const IsLoading: FC = () => {
  return (
    <>
      <div className="isLoading">

        <div className="loader">
          <span className="loader-block"></span>
          <span className="loader-block"></span>
          <span className="loader-block"></span>
          <span className="loader-block"></span>
          <span className="loader-block"></span>
          <span className="loader-block"></span>
          <span className="loader-block"></span>
          <span className="loader-block"></span>
          <span className="loader-block"></span>
        </div>

      </div>
    </>
  )};






export default IsLoading;
