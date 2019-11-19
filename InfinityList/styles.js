export const styles = theme => ({
  divider: {
    marginLeft: theme.spacing(4.5),
    marginRight: theme.spacing(1.5),
    backgroundColor: "lightgray",
  },
  list: {
    width: "100%",
    overflow: "auto",
    ...theme.mixins.scroll[0],
  },
  selectedCount: {
    bottom: -1,
    color: "rgba(0, 0, 0, 0.3)",
    fontSize: "9px",
    right: theme.spacing(2),
    position: "absolute",
  },
  selectedWrapper: {
    position: "relative",
  },
  wrapper: {
    display: "table",
  },
});
