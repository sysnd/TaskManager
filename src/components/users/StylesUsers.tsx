import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => {
    return {
        lightRow: {
            background: '#fff'
        },
        darkRow: {
            background: '#f5f5f5'
        },
        container: {
            width: '100%',
            boxSizing: 'border-box',
            maxWidth: '1248px',
            margin: 'auto'
        },
        text: {
            fontSize: '14px',
            color: '#222222',
            padding: '4px'
        },
        textAlign: {
            textAlign: 'center'
        }
    };
});