// @ts-nocheck
/* eslint-disable */
import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import SyncIcon from '@mui/icons-material/Sync';
import ReplayIcon from '@mui/icons-material/Replay';
// import BlockUi from '@/components/BlockUi';
import FilterListIcon from '@mui/icons-material/FilterList';
import DataTable, { MUIDataTableOptions } from 'mui-datatables';
import { makeStyles } from '@mui/styles';
// import { useSnackbar } from '@/providers/Snackbar';
import { debounce, get, isEmpty, set } from 'lodash';

const defaultProps = {
  rowIndexColumn: false,
  hasInitialLoad: true,
};

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  iconButton: {
    color: 'white',
  },
}));

export type MUIDataTableHandle = {
  findData: (index: number) => any;
  fetchData: () => void;
  createRecord: (newItem: any, path?: string) => void;
  updateRecord: (id: number | string, newItem: any, path?: string) => void;
  deleteRecord: (id: number | string, path?: string) => void;
};

const MUIDataTable: any = React.forwardRef<React.ReactNode, any>(
  (
    {
      data,
      metadata,
      loading,
      error,
      params,
      columns,
      fetchData,
      hasInitialLoad,
      searchTime,
      filterForm,
      openFilterForm,
      rowIndexColumn,
      additionalDataByRow,
      createRecordCallback,
      reloadTableCallback,
      syncTableCallback,
      slotHeader,
      slotFooter,
      onDataChange,
      ...props
    },
    ref,
  ) => {
    const classes = useStyles();
    // const snackbar = useSnackbar();
    const [state, setState] = React.useState({
      data: data || [],
      metadata: metadata || {},
      loading: loading || false,
      error: error || {},
      openFilterForm: openFilterForm || false,
      serverSide: false,
      fetchDataArgs: {},
      overwrites: params?.overwrites || {},
      count: props?.options?.count || 1,
      rowsPerPage: props?.options?.rowsPerPage || 5,
    });
    delete params?.overwrites;

    const _parseOrderBy = (orderBy) => {
      if (!isEmpty(orderBy)) {
        return `${orderBy.name}:${orderBy.direction}`;
      }
      return 'id:desc';
    };

    const _parseFilters = (filters: any, overwrites: any = null) => {
      const originalKeys: Array<string> = [];
      let overwrittenFilters = {};
      if (overwrites) {
        Object.keys(overwrites).forEach(key => {
          const newKey = overwrites[key];
          if (originalKeys.indexOf(key) === -1) originalKeys.push(key);
          if (Array.isArray(newKey)) {
            newKey.forEach(_key => {
              overwrittenFilters[_key] = filters[key];
            });
          } else {
            overwrittenFilters[newKey] = filters[key];
          }
        });
      }

      overwrittenFilters = { ...overwrittenFilters, ...filters };
      originalKeys.forEach(key => {
        delete overwrittenFilters[key];
      });

      const obj = {};
      Object.keys(overwrittenFilters).forEach(key => {
        if (key.match(/=/)) {
          const [newKey] = key.split('=');
          obj[`${newKey}`] = overwrittenFilters[key];
        } else if (!key.match(/:/)) {
          obj[`${key}:ilike`] = overwrittenFilters[key];
        } else {
          obj[`${key}`] = overwrittenFilters[key];
        }
      });

      return obj;
    }

    const _fetchData = async (args: any = {}) => {
      const { page, sortOrder, q, filters } = args;
      let _args: any = {
        ...params,
        ...filters,
        _orderBy: _parseOrderBy(sortOrder),
      };

      // Pagination...
      if(props.options?.pagination !== false){
        _args = {
          ..._args,
          _limit: args.rowsPerPage || +state.rowsPerPage,
          _page: +page + 1 || 1,
        }
      }

      if (q) {
        _args.q = q;
      }

      try {
        setState({ ...state, loading: true, error: null });
        const resource = await fetchData(_args);
        const metadata = { ...resource };
        delete metadata.data;

        const data = resource.data.map((item) => ({
          ...item,
          ...additionalDataByRow,
        }));

        setState({
          ...state,
          data,
          metadata,
          loading: false,
          error: null,
          serverSide: true,
          count: metadata?.headers?.['pagination-total-count']
            ? parseInt(metadata?.headers?.['pagination-total-count'])
            : 0,
          rowsPerPage: args.rowsPerPage || +state.rowsPerPage,
        });
      } catch (error) {
        // snackbar({ message: error.message, variant: 'error' });
        setState({ ...state, loading: true, error });
        throw error;
      }
    };

    const _search = debounce(async (searchText) => {
      await _fetchData({ ...state.fetchDataArgs, q: searchText });
    }, props?.searchTime || 400);

    const onTableChange = async (action, tableState) => {
      if (state.serverSide) {
        switch (action) {
          case 'changePage':
            await _fetchData({ ...tableState });
            break;
          case 'sort':
            await _fetchData({ ...tableState });
            break;
          case 'changeRowsPerPage':
            await _fetchData({ ...tableState });
            break;
          default:
            break;
        }
      }
    };

    const onSearchChange = async (searchText: string) => {
      if (state.serverSide) {
        await _search(searchText);
      }
    };

    const customToolbarOptions = {
      createRecordCallback: !!createRecordCallback,
      reloadTableCallback: !!reloadTableCallback,
      syncTableCallback: !!syncTableCallback,
      filterForm: !!filterForm,
    };

    const customToolbar = ({ displayData }) => (
      <>
        {customToolbarOptions.filterForm && (
          <IconButton
            className={classes.iconButton}
            aria-label="add"
            onClick={() =>
              setState({
                ...state,
                openFilterForm: !state.openFilterForm,
              })
            }
          >
            <FilterListIcon />
          </IconButton>
        )}
        {customToolbarOptions.reloadTableCallback && (
          <IconButton
            className={classes.iconButton}
            aria-label="replay"
            onClick={reloadTableCallback}
          >
            <ReplayIcon />
          </IconButton>
        )}
        {customToolbarOptions.syncTableCallback && (
          <IconButton
            className={classes.iconButton}
            aria-label="sync"
            onClick={syncTableCallback}
          >
            <SyncIcon />
          </IconButton>
        )}
        {customToolbarOptions.createRecordCallback && (
          <IconButton
            className={classes.iconButton}
            aria-label="add"
            onClick={createRecordCallback}
          >
            <AddIcon />
          </IconButton>
        )}
      </>
    );

    React.useImperativeHandle(ref, () => ({
      async fetchData() {
        await _fetchData();
      },
      async filter(filters) {
        filters = _parseFilters(filters, state.overwrites);
        await _fetchData({ ...params, ...state.fetchDataArgs, filters });
      },
      createRecord(newItem: any, others: { path?: string } = {}) {
        let data = [...state.data];
        const { path = '' } = others;
        const items = path ? get(data, path) : data;
        items.unshift(newItem);
        items.length >= state.rowsPerPage && items.pop();
        path ? set(data, path, items) : (data = items);
        setState({ ...state, data, count: +state.count + 1 });
      },
      createRecords(newItems: any[], others: { path?: string } = {}) {
        let counter = 0;
        let data = [...state.data];
        const { path = '' } = others;
        const items = path ? get(data, path) : data;
        newItems.forEach((item) => {
          items.unshift(item);
          items.length >= state.rowsPerPage && items.pop();
          counter++;
        });
        path ? set(data, path, items) : (data = items);
        setState({ ...state, data, count: +state.count + counter });
      },
      updateRecord(
        id: number | string,
        newItem,
        others: { path?: string; queryKey?: string } = {},
      ) {
        let data = [...state.data];
        const { path = '', queryKey = 'id' } = others;
        const items = path ? get(data, path) : data;
        const newData = items.map((item) =>
          (item[queryKey] == id ? { ...item, ...newItem } : item)
        );
        path ? set(data, path, newData) : (data = newData);
        setState({ ...state, data });
      },
      deleteRecord(id: number | string, others: { path?: string, queryKey?: string } = {}) {
        let data = [...state.data];
        const { path = '', queryKey = 'id' } = others;
        const items = path ? get(data, path) : data;
        const newData = items.filter((item) => item[queryKey] != id);
        path ? set(data, path, newData) : (data = newData);
        setState({
          ...state,
          data,
          count: +state.count - 1,
          rowsPerPage: +state.rowsPerPage - 1,
        });
      },
      deleteRecords(ids: number[] | string[], others: { path?: string }) {},
      findData(index: number) {
        return state.data[index];
      },
      getState() {
        return state;
      },
      setState(newState: any) {
        setState(newState);
      },
    }));

    React.useEffect(() => {
      (async () => {
        !data && hasInitialLoad && await _fetchData();
      })();
    }, []);

    React.useEffect(() => {
      !!data && setState({ ...state, data, metadata, loading, error, });
    }, [data, metadata, loading, error]);

    React.useEffect(() => {
      onDataChange && onDataChange(state.data);
    }, [state.data]);

    const textLabels = {
      body: {
        noMatch: 'Sorry, no matching records found',
        toolTip: 'Sort',
        columnHeaderTooltip: (column) => `Sort for ${column.label}`,
      },
      pagination: {
        next: 'Next Page',
        previous: 'Previous Page',
        rowsPerPage: 'Rows per page:',
        displayRows: 'of',
      },
      toolbar: {
        search: 'Search',
        downloadCsv: 'Download CSV',
        print: 'Print',
        viewColumns: 'View Columns',
        filterTable: 'Filter Table',
      },
      filter: {
        all: 'All',
        title: 'FILTERS',
        reset: 'RESET',
      },
      viewColumns: {
        title: 'Show Columns',
        titleAria: 'Show/Hide Table Columns',
      },
      selectedRows: {
        text: 'row(s) selected',
        delete: 'Delete',
        deleteAria: 'Delete Selected Rows',
      },
    };

    const options: MUIDataTableOptions = {
      filter: props?.options?.filter || false,
      filterType: props?.options?.filterType || 'dropdown',
      selectableRows: props?.options?.selectableRows || 'none',
      print: props?.options?.print || false,
      download: props?.options?.download || false,
      count: props?.options?.count || +state.count,
      rowsPerPage: props?.options?.rowsPerPage || +state.rowsPerPage,
      rowsPerPageOptions: props?.options?.rowsPerPageOptions || [
        5,
        10,
        15,
        100,
      ],
      textLabels,
      onSearchChange:
        props?.options?.onSearchChange ||
        (async (searchText) => {
          await onSearchChange(searchText);
        }),
      onTableChange:
        props?.options?.onTableChange ||
        (async (action, tableState) => {
          await onTableChange(action, tableState);
        }),
      customToolbar:
        props?.options?.customToolbar || ((display) => customToolbar(display)),
      ...props.options,
    };

    const indexColumn = {
      name: '#',
      options: {
        filter: false,
        customBodyRender: (value: any, meta) => {
          const pageCount = state.metadata?.headers?.['pagination-page-count'] ;
          const currentPage = state.metadata?.headers?.['pagination-current-page'];
          return currentPage <= 1  ? meta.rowIndex + 1 : ((pageCount * (currentPage - 1)) + (meta.rowIndex + 1));
        }
      }
    }

    return (
      <div className={classes.root}>
        {filterForm && state.openFilterForm && filterForm}
        {slotHeader && slotHeader}
        {/* <BlockUi blocking={state.loading || loading}> */}
          <DataTable
            {...props}
            options={options}
            columns={rowIndexColumn ? [indexColumn, ...columns] : columns}
            data={state.data}
          />
        {/* </BlockUi> */}
        {slotFooter && slotFooter}
      </div>
    );
  },
);

MUIDataTable.defaultProps = defaultProps;

export default MUIDataTable;
