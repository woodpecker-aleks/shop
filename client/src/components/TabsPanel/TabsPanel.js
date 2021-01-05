import { Tab, Tabs, Box, Divider } from "@material-ui/core";
import { useCallback, useState, memo } from "react";
import { useStyles } from "./TabsPanelClasses";

function TabPanel({ children, value, index, ...props }) {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabsPanel({ tabs, panels, ...props }) {
  const [value, setValue] = useState(0);
  const onChange = useCallback((event, newValue) => setValue(newValue), [setValue]);
  const classes = useStyles();

  return (<>
    <Tabs
      value={value}
      onChange={onChange}
      aria-label="product tabs"
      indicatorColor="primary"
      textColor="primary"
      classes={{
        indicator: classes.tabsScroller
      }}
    >
      {tabs.map((tab, index) => (
        <Tab
          label={tab}
          {...a11yProps(index)}
          key={index}
          classes={{
            selected: classes.selectedTab,
          }}
        />
      ))}
    </Tabs>
    <Divider />
    {panels.map((panel, index) => (
      <TabPanel
        value={value}
        index={index}
        key={index}
      >
        {panel}
      </TabPanel>
    ))}
  </>)
}

export default memo(TabsPanel);