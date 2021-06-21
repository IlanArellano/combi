import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

import "./styles/index.css";

const useStyles = makeStyles({
  text: {
    fontSize: 20,
    marginBottom: 16,
  },
  textSecondary: {
    fontSize: 25,
    marginBottom: 16,
  },
});

function Error404Page() {
  const classes = useStyles();
  return (
    <div className="Error404">
      <div className="Content404">
        <div>
          <Typography variant="h1" color="inherit" className={classes.text}>
            404 ERROR
          </Typography>
        </div>

        <div>
          <Typography
            variant="h5"
            color="textSecondary"
            className={classes.textSecondary}
          >
            La página que deseas ingresar no ha sido encontrada!.
          </Typography>
        </div>

        <Link to="/home">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default Error404Page;
