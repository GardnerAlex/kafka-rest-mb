import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Footer } from '../Footer';
import { HomePage } from '../HomePage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

export const App = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <main className={classes.content}>
        <Container maxWidth="lg">
          <Grid container className={classes.root} spacing={3}>
            <Grid item xs={12}>
              <Route
                path="/"
                component={HomePage}
              />
            </Grid>
          </Grid>
          <Footer title="Kafka Rest test assignment" description="" />
        </Container>
      </main>
    </div>
  );
};
