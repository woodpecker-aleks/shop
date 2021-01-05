import { MenuItem, Select as SimpleSelect } from "@material-ui/core";
import { memo, useState } from "react";

function Select({ defaultValue = '', items, onChange, ...props }) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (event) => {
    setValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <SimpleSelect
      value={value}
      onChange={handleChange}
    >
      {items.map(item => (
        <MenuItem
          value={item.value}
          key={item.value}
        >
          {item.label}
        </MenuItem>
      ))}
    </SimpleSelect>
  )
}

export default memo(Select);