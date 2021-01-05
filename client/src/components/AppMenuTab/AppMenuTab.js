import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React, { useMemo, memo } from 'react';
import { Link } from "react-router-dom";
import { useStyles } from './AppMenuTabClasses';

function AppMenuTab({ onClick, children, dropdown, tab, innerListClass, value, className, ...props }) {
  const classes = useStyles(props);

  const ItemConfig = useMemo(() => ({
    value: value,
    component: "li",
    button: true,
    onClick: (e) => onClick.forEach(func => func?.(e)),
    className: clsx(innerListClass, classes.root, className),
  }), [classes.root, innerListClass, onClick, className, value]);

  if (tab.linkTo) {
    ItemConfig.to = tab.linkTo;
    ItemConfig.component = Link;
  }

  let innerTabs;
  if (tab.innerTabs) {
    innerTabs = (
      <Collapse
        in={dropdown === tab.tabPrimaryText}
        timeout="auto"
        unmountOnExit
      >
        <List
          disablePadding
          subheader={tab.innerTabsHeader && (
          <ListSubheader>
            {tab.innerTabsHeader}
          </ListSubheader>
        )}>
          {tab.innerTabs.map(tb => (
            <AppMenuTab
              key={tb.tabPrimaryText}
              tab={tb}
              onClick={[tb.onClick]}
              innerListClass={classes.nested}
            >
              {tb.body}
            </AppMenuTab>
          ))}
        </List>
        <Divider />
      </Collapse>
    )
  }

  return (<>
    <ListItem {...ItemConfig}>
      <ListItemIcon className={classes.listItemIcon}>
        {tab.tabIcon}
      </ListItemIcon>
      <ListItemText
        primary={tab.tabPrimaryText}
        secondary={tab.tabSecondaryText}
      />
      <ListItemSecondaryAction className={classes.listItemBody}>
        {children}
        {tab.innerTabs ? (dropdown === tab.tabPrimaryText ? <ExpandLess className={classes.listItemArrow} /> : <ExpandMore className={classes.listItemArrow} />) : ''}
      </ListItemSecondaryAction>
    </ListItem>
    {tab.afterBody}
    {innerTabs}
  </>);
}

export default memo(AppMenuTab);