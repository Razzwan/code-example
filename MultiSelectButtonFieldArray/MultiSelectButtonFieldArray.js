import React, { useCallback, useEffect, useMemo, useState } from "react";

import cn from "classnames";
import uniqueId from "lodash/uniqueId";
import * as PropTypes from "prop-types";
import { fieldArrayPropTypes } from "redux-form";

import Chip from "@material-ui/core/Chip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Collapse from "@material-ui/core/Collapse";
import FormHelperText from "@material-ui/core/FormHelperText";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import Tooltip from "@material-ui/core/Tooltip";

import { ExpandedBtn } from "@components/Buttons";
import MultiSelectSearchFieldArray from "@components/MultiSelectSearchFieldArray";

import { useStyles } from "./styles";

export default function MultiSelectButtonFieldArray({
  className,
  fields,
  fetchData,
  getLabel,
  getValue,
  getShortLabel,
  items,
  label,
  placeholder,
  grouped,
  meta,
  ...rest
}) {
  const classes = useStyles();

  useEffect(() => {
    if (fetchData) {
      fetchData();
    }
  }, [fetchData]);

  const [width, setWidth] = useState(400);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const selectedLabels = useMemo(() => {
    if (fields.length) {
      return items.filter(el => fields.getAll().includes(getValue(el))).map(getShortLabel || getLabel);
    } else {
      return [];
    }
  }, [fields, getLabel, getShortLabel, getValue, items]);

  const selectedText = useMemo(() => {
    if (selectedLabels.length) {
      return selectedLabels.join(", ");
    } else {
      return placeholder;
    }
  }, [selectedLabels, placeholder]);

  const selectedChips = useMemo(() => {
    if (selectedLabels.length) {
      return (
        <div className={classes.btns}>
          {selectedLabels.map(el => (
            <Chip label={el} key={el} tabIndex={-1} className={classes.chip} classes={{ label: classes.chipLabel }} />
          ))}
        </div>
      );
    } else {
      return <div className={classes.placeholder}>{placeholder}</div>;
    }
  }, [classes, selectedLabels, placeholder]);

  const handleClick = useCallback(
    event => {
      setWidth(event.currentTarget.offsetWidth);
      setAnchorEl(anchorEl ? null : event.currentTarget);
    },
    [anchorEl, setAnchorEl, setWidth]
  );

  const { dirty, touched, submitFailed, invalid, error } = meta;
  const isError = useMemo(() => (dirty || touched || submitFailed) && invalid, [dirty, touched, submitFailed, invalid]);

  const open = Boolean(anchorEl);

  const id = uniqueId(placeholder.replace(" ", "_"));

  if (!items.length) {
    return null;
  }

  return (
    <div className={cn(classes.fieldWrapper, className)}>
      {Boolean(label) && <div className={classes.fieldLabel}>{label}</div>}
      <Tooltip title={fields.length ? selectedText : ""} placement="top">
        <div>
          <ExpandedBtn
            className={cn(classes.btn, { [classes.btnError]: isError })}
            fullWidth
            expanded={open}
            aria-describedby={id}
            variant="contained"
            onClick={handleClick}
          >
            {selectedChips}
          </ExpandedBtn>
        </div>
      </Tooltip>
      {isError && (
        <FormHelperText error className={classes.error}>
          {error}
        </FormHelperText>
      )}
      <Popper keepMounted={false} id={id} open={open} anchorEl={anchorEl} transition className={classes.popper}>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClick}>
            <Collapse {...TransitionProps}>
              <Paper className={classes.paper} style={{ width }}>
                <MultiSelectSearchFieldArray
                  {...rest}
                  meta={meta}
                  fields={fields}
                  items={items}
                  autoFocus
                  getLabel={getLabel}
                  getValue={getValue}
                  grouped={grouped}
                  hideError
                />
              </Paper>
            </Collapse>
          </ClickAwayListener>
        )}
      </Popper>
    </div>
  );
}

MultiSelectButtonFieldArray.propTypes = {
  ...fieldArrayPropTypes,
  className: PropTypes.string,
  fetchData: PropTypes.func,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  getLabel: PropTypes.func,
  getValue: PropTypes.func,
  getShortLabel: PropTypes.func,
  grouped: PropTypes.bool,
};

const defGetLabel = i => i.label;
const defGetValue = i => i.id;

MultiSelectButtonFieldArray.defaultProps = {
  placeholder: "Select Items",
  getLabel: defGetLabel,
  getValue: defGetValue,
};
