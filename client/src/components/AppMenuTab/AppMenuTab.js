import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader } from "@material-ui/core";
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import clsx from 'clsx';
import React from 'react';
import { Link } from "react-router-dom";
import { If } from '../../jsxOperators';
import { useStyles } from './AppMenuTabClasses';

function AppMenuTab(props) {
  const classes = useStyles(props);
  const { onClick, children, dropdown, tab, innerListClass, value} = props;

  const ItemConfig = {
    value: value,
    component: "li",
    button: true,
    onClick: (e) => onClick.forEach(func => func?.(e)),
    className: clsx(innerListClass, classes.root, props.className),
  }

  if (tab.linkTo) {
    ItemConfig.to = tab.linkTo;
    ItemConfig.component = Link;
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
        {(tab.innerTabs) ? ((dropdown === tab.tabPrimaryText) ? <ExpandLess className={classes.listItemArrow} /> : <ExpandMore className={classes.listItemArrow} />) : ''}
      </ListItemSecondaryAction>
    </ListItem>
    {tab.afterBody}

    {If(tab.innerTabs)(() => (
    
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

    )).End()}

  </>);
}

export default AppMenuTab;