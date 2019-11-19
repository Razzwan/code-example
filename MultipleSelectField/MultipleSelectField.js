import React from "react";

import * as PropTypes from "prop-types";
import { fieldPropTypes } from "redux-form";

import MultipleSelect from "@components/MultipleSelect";

export default function MultipleSelectField({ input, ...rest }) {
  return <MultipleSelect {...rest} name={input.name} value={input.value} onChange={input.onChange} />;
}

MultipleSelectField.propTypes = {
  ...fieldPropTypes,
  items: PropTypes.array.isRequired,
};

MultipleSelectField.defaultProps = {};
