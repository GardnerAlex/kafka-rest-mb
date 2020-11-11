import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0)
  }
}));

export function Footer(props: { description: string, title: string}) {
  const classes = useStyles();
  const { description, title } = props;

  return (
    <footer className={classes.footer}>
      <Container>
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="inherit" align="center" component="p">
          {description}
        </Typography>
      </Container>
    </footer>
  );
}
