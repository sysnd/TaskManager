import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
  return {
    text: {
      color: '#000',
      fontWeight: 400
    },
    appBar: {
      boxSizing: 'border-box',
    },
    toolbar: {
      width: '100%',
      boxSizing: 'border-box',
      maxWidth: '1248px',
      margin: 'auto',
      marginBottom: '0',
      marginTop: '0',
      padding: '0'
    },
    grow: {
      boxSizing: 'border-box'
    },
    linkIcon: {
      height: '14px',
      position: 'relative',
      color: theme.palette.secondary.main,
    },
    linkText: {
      color: theme.palette.text.primary,
    },
    buttonLogout: {
      color: '#fff',
      float: 'right',
      marginTop: '8px'
    },
    container: {
      display: 'flex',
      float: 'right'
    },
    marginTop:{
      marginTop: '14px'
    }
  };
});
