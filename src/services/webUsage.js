function makePieChartData(value1, value2, value3) 
{
    const pieChartData = [
        {
            color: "#05A301",
            value: value1,
            label: "Completed",
        },
        {
            color: "#0224FF",
            value: value2,
            label: "In Progress",
        },
        {
            color: "#F21E1E",
            value: 100 - value1  - value2,
            label: "Not Started",
        },
    ];
    return pieChartData
}

export const valueFormatter = (item) => `${item.value}%`;
//   --color-in-progress: #0224FF;
//   --color-not-started: #F21E1E;
//   --color-completed: #F21E1E;
export {makePieChartData}