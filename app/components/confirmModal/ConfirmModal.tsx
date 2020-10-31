/* eslint-disable react/prop-types */
import React from 'react';
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const dialogStyle = makeStyles({
  paper: {
    background: 'radial-gradient(circle at top, #212328 0%, #0a0b0d 100%)',
    color: 'white',
    border: '1px solid rgba(193, 193, 193, 0.2)'
  },
  content: {
    color: '#C1C1C1'
  }
});

export default function CustomizedDialogs(props) {
  const { modalOpen = false, title, content, onModalClose } = props;
  const classes = dialogStyle();

  return (
    <Dialog
      open={modalOpen}
      onClose={() => {onModalClose(false);}}
      aria-labelledby="responsive-dialog-title"
      classes={{ paper: classes.paper }}
    >
      <DialogTitle id="customized-dialog-title" onClose={() => {onModalClose(false);}}>
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText classes={{ root: classes.content }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => {onModalClose(false);}} style={{color: '#de2e31'}}>
          CANCEL
        </Button>
        <Button onClick={() => {onModalClose(true);}} style={{color: '#de2e31'}} autoFocus>
          CLEAR ALL
        </Button>
      </DialogActions>
    </Dialog>
  );
};
