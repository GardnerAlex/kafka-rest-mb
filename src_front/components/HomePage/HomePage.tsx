import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { sendData } from '../../api';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 350
    }
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  cardGrid: {
    paddingTop: theme.spacing(8)
  },
  card: {
    height: '100%',
    display: 'flex',
    width: 280,
    flexDirection: 'column'
  },
  cardContent: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }
}));

export const HomePage = () => {
  const classes = useStyles();
  const [cardData, setCardData] = useState<string>('12344321');
  const [expirationData, setExpirationData] = useState<string>('2020-01-07');
  const [cvvData, setCvvData] = useState<string>('000');
  const [transactionData, setTransactionData] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    sendData({ card: cardData, expirationDate: expirationData, cvv: cvvData })
      .then((value) => {
        console.log('response from API', value);
        setTransactionData(value.data.result.transactionId);
        setIsLoading(false);
        console.log('transaction data', value.data.result.transactionId, transactionData);
        if (value.data.error.code !== 0) {
          setError(value.data.error.description);
        }
        // setCardData(value.data.result.card);
        // setExpirationData(value.data.result.expiration);
        // setCvvData(value.data.result.cvv);
      })
      .catch((err) => {
        setError(`Error occurred: ${err}`);
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, executor: Function) => {
    executor(event.target.value);
  };

  return (
    <>
      <main>
        <Container className={classes.cardGrid} maxWidth="lg">
          <Grid container justify="center" spacing={2}>
            <form className={classes.root} autoComplete="off">
              <div>
                <TextField
                  required
                  id="card"
                  label="Card number"
                  helperText="Enter card number"
                  type="number"
                  value={cardData}
                  onChange={(event) => { handleInputChange(event, setCardData); }}
                />
              </div>
              <div>
                <TextField
                  required
                  id="expiration"
                  type="date"
                  helperText="Enter card expiration date"
                  value={expirationData}
                  onChange={(event) => { handleInputChange(event, setExpirationData); }}
                />
              </div>
              <div>
                <TextField
                  required
                  id="cvv"
                  label="Card CVV number"
                  helperText="Enter card CVV number"
                  type="number"
                  inputMode="numeric"
                  value={cvvData}
                  onChange={(event) => { handleInputChange(event, setCvvData); }}
                />
              </div>
              <div hidden={transactionData === ''}>
                <TextField
                  disabled
                  id="transaction"
                  helperText="Transaction ID"
                  value={transactionData}
                />
              </div>
              {!isLoading && error ? (
                <div>
                  <p>
                    Oh no something went wrong:
                    {error}
                  </p>
                </div>
              ) : null}
              <Button type="submit" size="small" color="primary" onClick={(event) => handleSubmit(event)}>
                Submit
              </Button>
            </form>
          </Grid>
        </Container>
      </main>
    </>
  );
};
