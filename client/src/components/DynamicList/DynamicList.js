import { List } from '@material-ui/core';
import { memo, useCallback, useEffect, useState } from 'react';
import DynamicItem from './DynamicItem';

function DynamicList({ schema, model, itemKey, empty, after, before, maxItems = Infinity, ...props }) {
  const [modelList, setModelList] = useState([]);

  const deleteModelListItem = useCallback(id => {
    setModelList(modelList.filter(example => itemKey(example) !== id));
  }, [itemKey, modelList]);

  useEffect(() => {
    setModelList(model);
  }, [model]);

  return (
    <List {...props}>
      {before}
      {modelList.length ? modelList.map((example, index) => {
        if (index < maxItems) return (
          <DynamicItem
            key={itemKey(example)}
            id={itemKey(example)}
            example={example}
            schema={schema}
            deleteItem={deleteModelListItem}
          />
        )
      }) : empty}
      {after}
    </List>
  )
}

export default memo(DynamicList);