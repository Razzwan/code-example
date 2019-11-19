import React from "react";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import get from "lodash/get";
import * as PropTypes from "prop-types";
// import copyCodeBlock from "@pickra/copy-code-block";

import FilterItem from "@components/Filter/Filter/FilterItem";
import BlockDecorator from "@decorators/BlockDecorator";

import InfinityList from ".";

const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => ({
  value: `item_${i}`,
  label: i % 2 === 0 ? `Very long label for item with index ${i}` : `Label ${i}`,
  disabled: i % 3 !== 0,
}));

function Row(props) {
  const { index } = props;

  return (
    <FilterItem
      disabled={get(items, [index, "disabled"])}
      label={get(items, [index, "label"], "loading...")}
      selected={!!(index % 5)}
      {...props}
    />
  );
}

Row.propTypes = {
  index: PropTypes.number,
  style: PropTypes.object,
};

storiesOf("InfinityList", module)
  .addDecorator(BlockDecorator)
  .add("default", () => (
    <InfinityList total={200} items={items} loadMore={action("load more items")}>
      {Row}
    </InfinityList>
  ));
