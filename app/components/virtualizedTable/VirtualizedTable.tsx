/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { TableCell, IconButton } from '@material-ui/core';
import { AutoSizer, Column, Table } from 'react-virtualized';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import StopIcon from '@material-ui/icons/Stop';
import CloseIcon from '@material-ui/icons/Close';
import AntSwitch from '../antSwitch/AntSwitch';
import { StatusIcon } from '../svgIcons/SvgIcons';

const styles = (theme) =>
  createStyles({
    flexContainer: {
      display: 'flex',
      alignItems: 'center',
      boxSizing: 'border-box',
    },
    table: {
      // temporary right-to-left patch, waiting for
      // https://github.com/bvaughn/react-virtualized/issues/454
      '& .ReactVirtualized__Table__headerRow': {
        flip: false,
        paddingRight: theme.direction === 'rtl' ? '0 !important' : undefined,
      },
    },
    tableRow: {
      cursor: 'pointer',
    },
    tableRowHover: {
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      },
    },
    tableCell: {
      flex: 1,
    },
    noClick: {
      cursor: 'initial',
    },
  });

class MuiVirtualizedTable extends React.PureComponent {
  addStatusColor = (status) => {
    let color;
    switch (String(status).toLocaleLowerCase()) {
      case 'check email':
        color = '#30C9AC';
        break;
      case 'processing':
        color = '#B6A4FF';
        break;
      case 'adding to cart':
        color = '#F3B81A';
        break;
      case 'declined':
        color = '#DA2C12';
        break;
      default:
        break;
    }
  
    return (<span style={{ color }}>{status}</span>);
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  contentRenderer = (rowIndex, dataKey, cellData) => {
    const { onBypassToggle } = this.props;
    let cellContent = cellData;

    switch (dataKey) {
      case 'index':
        cellContent = (
          <div className="index-row">
            <StatusIcon style={{ color: 'red' }} />
            <span>{rowIndex}</span>
          </div>
        );
        break;
      case 'action':
        cellContent = (
          <div>
            <IconButton size="small">
              <PlayArrowIcon style={{ fontSize: 18 }} />
            </IconButton>
            <IconButton size="small">
              <CloseIcon style={{ fontSize: 18 }} />
            </IconButton>
            <IconButton size="small">
              <StopIcon style={{ fontSize: 18 }} />
            </IconButton>
          </div>
        );
        break;
      case 'bypass':
        cellContent = (
          <AntSwitch
            checked={cellData}
            onChange={(event) => { onBypassToggle(rowIndex, event.target.checked); }}
          />
        );
        break;
      case 'profile':
        cellContent = cellData.name;
        break;
      case 'status':
        cellContent = this.addStatusColor(cellData);
        break;
      default:
        break;
    }

    return cellContent;
  };

  cellRenderer = (cell) => {
    const { cellData, columnIndex, dataKey, rowIndex } = cell;
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {[classes.noClick]: onRowClick == null})}
        variant="body"
        style={{ height: rowHeight }}
      >
        {this.contentRenderer(rowIndex, dataKey, cellData)}
      </TableCell>
    );
  };

  headerCellRenderer = (label) => {
    const { onBypassToggleBulk } = this.props;
    if (label === 'BYPASS') {
      return (
        <span onClick={onBypassToggleBulk} style={{ cursor: 'pointer' }}>{label}</span>
      );
    }

    return (<span>{label}</span>);
  }

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight }}
      >
        {this.headerCellRenderer(label)}
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight!}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight!}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })}
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                />
              );
            })}
          </Table>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.defaultProps = {
  headerHeight: 48,
  rowHeight: 48,
};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

export default VirtualizedTable;
