// @ts-nocheck
/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';

import { Routes } from "./routes/routes";
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';
//import { BrowserRouter as Router } from "react-router-dom";


import { Provider } from 'react-redux';

import store from './store/store'


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#C3E1EF',
      main: '#469dc3',
      dark: '#2886AF',
      contrasts: 'rgba(70, 157, 195, 0.62)',
      contrastText: '#FFF',
    },
    secondary: {
      light: '#874C85',
      main: '#702f6d',
      dark: '#5B1B59',
      contrasts: 'rgba(112, 47, 109, 0.62)',
      contrastText: '#fff',
    },
    error: {
      light: '#FFA8A8',
      main: '#F47C7C',
      dark: '#CE4C4C',
      contrasts: 'rgba(244, 124, 124, 0.62)',
      contrastText: '#fff',
    },
    warning: {
      light: '#FFC16A',
      main: '#ffb347',
      dark: '#F0981A',
      contrasts: 'rgba(255, 179, 71, 0.62)',
      contrastText: '#fff',
    },
    info: {
      light: '#80D6FA',
      main: '#57C7F8',
      dark: '#30B8F3',
      contrasts: 'rgba(87, 199, 248, 0.62)',
      contrastText: '#fff',
    },
    success: {
      light: '#28A586',
      main: '#059F78',
      dark: '#007C5D',
      contrasts: 'rgba(5, 159, 120, 0.62)',
      contrastText: '#fff',
    },
    dark: {
      light: '#878787',
      main: '#575757',
      dark: '#424242',
      contrasts: 'rgba(87, 87, 87, 0.62)',
      contrastText: '#fff',
    },
  },
  components: {
    MUIDataTable: {
      styleOverrides: {
        /* tableRoot:{
          maxWidth: 'none',
        }, */
        paper: {
          boxShadow: 'none',
          backgroundColor: 'transparent',
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        fixedHeader: {
          backgroundColor: 'transparent',
          fontWeight: 'bold',
        },
        toolButton: {
          fontWeight: 'bold',
        },
      },
    },
    MUIDataTableToolbar: {
      styleOverrides: {
        root: {
          color: 'white',
          backgroundColor: '#C3E1EF',
          borderRadius: '12px',
          marginBottom: '16px',
        },
        filterPaper: {
          maxWidth: 'none',
        },
        icon: {
          color: 'white',
          '&:hover': {
            color: 'white',
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '10px 16px',
        },
      },
    }
  },
  shade: {
    light: '0 10px 15px -5px rgba(62, 57, 107, .07)',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
      <Provider store={store}>
        {/*<Router>*/}
          <Routes />
        {/*</Router>*/}
      </Provider>
    </ThemeProvider>

  </React.StrictMode>,
  document.getElementById('root')
);