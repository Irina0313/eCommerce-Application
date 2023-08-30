import React, { useState, useEffect } from 'react';
import { store } from '../../store/store';
import * as Client from '../../api/Client';
import { PersonalInfoForm } from '../../components/UI-components/Forms/UserProfilePageForms/PersonalInfoForm';
import { Customer } from '@commercetools/platform-sdk';
import { Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ITabPanelProps } from '../../helpers/Interfaces.ts/FormsInterfaces';

export function ProfilePage() {
  const [loading, setloading] = useState<boolean>(false);

  function CustomTabPanel(props: ITabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [customerInfo, setCustomerInfo] = useState<Customer>();

  useEffect(() => {
    setloading(true);
    const storeState = store.getState();
    const userId = storeState.userReducer.id;

    async function fetchCustomerInfo() {
      try {
        const apiResponse = await Client.getCustomerInfo(userId);
        setCustomerInfo(apiResponse.body);
        setloading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchCustomerInfo();
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {customerInfo !== undefined && (
        <Box sx={{ width: '100%', margin: '20px 0' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Personal Info" {...a11yProps(0)} />
              <Tab label="Billing Addresses" {...a11yProps(1)} />
              <Tab label="Sipping Addresses" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <PersonalInfoForm customerInfo={customerInfo} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Item Two
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      )}
      {loading && (
        <CircularProgress
          size={96}
          sx={{
            color: 'blue',
            position: 'absolute',
            top: '40%',
            left: '50%',
          }}
        />
      )}
    </>
  );
}
