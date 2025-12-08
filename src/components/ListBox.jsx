import React, { useState } from "react";
import Select from "react-select";

const options = [
  { value: "completed", label: "Completed" },
  { value: "in progress", label: "In Progress" },
  { value: "to do", label: "Not Started" },
];

function ListBox({
    selectedOption = null, 
    setSelectedOption = () => {} 
}) {
  const handleChange = (option) => {
    setSelectedOption(option);
    console.log(option) 
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      placeholder="Select the status..."
      className="z-99999 bg-(--color-primary)"
      required={true}
      styles={{
        control: (base) => ({
          ...base, 
          backgroundColor: 'var(--color-background-2)'
        }),
        singleValue: (base) => ({
          ...base, 
          color: 'var(--color-text)'
        })
      }}
    />
  );
}
export default ListBox 
