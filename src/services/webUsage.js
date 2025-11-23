export const desktopOS = [
  {
    color: '#05A301', 
    value: 70,
    label: 'Completed'
  },
  {
    color: '#0224FF', 
    value: 16,
    label: 'In Progress'
  },
  {
    color: '#F21E1E', 
    value: 14,
    label: 'Not Started', 
    
  },
];

export const valueFormatter = (item) => `${item.value}%`;
//   --color-in-progress: #0224FF;
//   --color-not-started: #F21E1E;
//   --color-completed: #F21E1E;