import { Switch } from '@material-ui/core';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';

const AntSwitch = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 18,
      padding: 0,
      display: 'flex',
      marginTop: 20,
    },
    switchBase: {
      padding: 2,
      color: theme.palette.grey[500],
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#C1C1C1',
          borderColor: '#C1C1C1',
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      height: 14,
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: '#444444',
      borderColor: '#444444'
    },
    checked: {},
  }),
)(Switch);

const AntSwitchRed = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 28,
      height: 18,
      padding: 0,
      display: 'flex',
      marginRight: 10,
    },
    switchBase: {
      padding: 2,
      color: '#151619',
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: '#DE3E3E',
          borderColor: '#DE3E3E',
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      height: 14,
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: '#23232C',
      borderColor: '#23232C'
    },
    checked: {},
  }),
)(Switch);

export default AntSwitch;
export { AntSwitchRed };
