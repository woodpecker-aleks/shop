import { Collapse } from "@material-ui/core";
import { memo, useCallback, useState } from "react";

function DynamicItem({ id, example, schema, deleteItem, ...props }) {
  const duration = 250;
  const [isDeleted, setIsDeleted] = useState(false);
  const removeItem = useCallback(() => {
    setIsDeleted(true);
    setTimeout(() => deleteItem(id), duration);
  }, [duration, id, deleteItem]);

  return (
    <Collapse
      in={!isDeleted}
      timeout={duration}
    >
      {schema(example, removeItem)}
    </Collapse>
  )
}

export default memo(DynamicItem);