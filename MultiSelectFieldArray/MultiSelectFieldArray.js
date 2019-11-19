import React, { useCallback } from "react";

import * as PropTypes from "prop-types";
import { fieldArrayPropTypes } from "redux-form";

import FilterItem from "@components/Filter/Filter/FilterItem";
import MultiSelect from "@components/MultiSelect";

export default function MultiSelectFieldArray({ fields, isParseToInt = false, ...rest }) {
  const changeArrValue = useCallback(
    event => {
      const curVal = isParseToInt ? parseInt(event.target.value) : event.target.value;
      if (event.target.checked) {
        fields.push(curVal);
      } else {
        const index = fields.getAll().findIndex(el => el === curVal);
        if (~index) {
          fields.remove(index);
        } else {
          throw new Error(`index was not found ${index}`);
        }
      }
    },
    [fields, isParseToInt]
  );

  return (
    <MultiSelect
      input={{
        value: fields.getAll() || [],
        onChange: changeArrValue,
      }}
      isParseToInt={isParseToInt}
      {...rest}
    />
  );
}

MultiSelectFieldArray.propTypes = {
  ...fieldArrayPropTypes,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  getLabel: PropTypes.func,
  getValue: PropTypes.func,
  height: PropTypes.number,
  isParseToInt: PropTypes.bool,
  itemSize: PropTypes.number,
  loadMore: PropTypes.func,
  searchTerm: PropTypes.string,
  total: PropTypes.number,
  width: PropTypes.number,
};

MultiSelectFieldArray.defaultProps = {
  children: FilterItem,
};
