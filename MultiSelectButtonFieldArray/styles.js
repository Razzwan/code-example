import { makeStyles } from "@material-ui/core/styles";

const rowHeight = 32;

export const useStyles = makeStyles(theme => ({
  alert: {
    flexShrink: 0,
    marginLeft: theme.spacing(1),
  },
  btn: {
    borderColor: "rgba(0, 0, 0, 0.23)",
    color: "inherit",
    flexGrow: 0,
    justifyContent: "space-between",
    padding: theme.spacing(0, 2, 0, 0),
    "& svg": {
      color: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover": {
      borderColor: "#000",
      backgroundColor: "inherit",
    },
  },
  btnError: {
    borderColor: theme.palette.error.main,
    "& svg": {
      color: theme.palette.error.main,
    },
    "&:hover": {
      borderColor: theme.palette.error.main,
    },
  },
  btns: {
    flex: "0 1 calc(100% - 16px)",
    maxHeight: rowHeight,
    overflow: "hidden",
    textAlign: "left",
  },
  chip: {
    backgroundColor: "gray",
    borderRadius: theme.shape.borderRadius,
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
    margin: theme.spacing(0.5, 0, 0.5, 0.5),
    maxHeight: "24px",
  },
  chipLabel: {
    display: "block",
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  error: {
    left: theme.spacing(1.25),
  },
  fieldLabel: {
    paddingBottom: theme.spacing(0.5),
    fontFamily: theme.typography.openSansSemiBold,
    color: "#6d7982",
  },
  fieldWrapper: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
    position: "relative",
  },
  formControl: {
    width: "100%",
  },
  outlinedInputRoot: {
    height: rowHeight,
  },
  outlinedInputInput: {
    padding: theme.spacing(1, 2),
  },
  paper: {
    minWidth: 400,
  },
  placeholder: {
    color: "rgba(0, 0, 0, 0.23)",
    padding: theme.spacing(0, 1),
  },
  popper: {
    zIndex: 1300,
  },
  root: {
    flex: 1,
    display: "contents",
  },
  row: {
    alignItems: "center",
    display: "flex",
  },
}));
