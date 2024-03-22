export const curriculum = [
  {
    id: 1,
    title: "Course list",
    items: [
      { id: 1, title: "Introduction" },
      { id: 2, title: "Installing Development Software" },
      { id: 3, title: "Hello World Project from GitHub" },
    ],
  },
  // {
  //   id: 2,
  //   title: "Introduction to JavaScript",
  //   items: [
  //     { id: 1, title: "Introduction" },
  //     { id: 2, title: "Installing Development Software" },
  //     { id: 3, title: "Hello World Project from GitHub" },
  //   ],
  // },
  // Add more sections as needed
];

export const courses = [
  { id: 1, title: "Introduction", videoUrl: "" },
  { id: 2, title: "Installing Development Software", videoUrl: "" },
  { id: 3, title: "Hello World Project from GitHub", videoUrl: "" },
];

export const dubs = [
  { id: 1, title: "Introduction", dub: true, ressource: {
      id: 10,
      step: true
    } 
  },
  { id: 2, title: "Installing Development Software", dub: true, ressource: {
      id: 10,
      step: false
    } 
  },
  { id: 3, title: "Hello World Project from GitHub", dub: false },
];