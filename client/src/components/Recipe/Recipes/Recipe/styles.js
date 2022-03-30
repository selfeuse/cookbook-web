import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    borderRadius: '15px',
    margin: '5px',
    width: 'auto'
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  title: {
    fontWeight: 600
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  goToButton: {
    right: '20px',
    bottom: '10px',
  }
});