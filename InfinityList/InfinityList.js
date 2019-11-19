import React, { useCallback } from "react";

import * as PropTypes from "prop-types";
import { FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

export default function InfinityList({
  children,
  classes,
  height,
  isItemLoaded,
  total,
  itemSize,
  items,
  loadMore,
  width,
}) {
  const defaultIsItemLoaded = useCallback(index => !!items[index], [items]);

  if (!isItemLoaded && !items) {
    throw new Error("One of [`isItemLoaded`, `items`] props MUST be specified!");
  }

  return (
    <InfiniteLoader isItemLoaded={isItemLoaded || defaultIsItemLoaded} itemCount={total} loadMoreItems={loadMore}>
      {({ onItemsRendered, ref }) => (
        <FixedSizeList
          className={classes.list}
          height={height}
          itemCount={total}
          itemSize={itemSize}
          onItemsRendered={onItemsRendered}
          ref={ref}
          width={width}
        >
          {children}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  );
}

InfinityList.propTypes = {
  children: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  height: PropTypes.number,
  isItemLoaded: PropTypes.func,
  total: PropTypes.number.isRequired,
  itemSize: PropTypes.number,
  items: PropTypes.arrayOf(PropTypes.any),
  loadMore: PropTypes.func,
  width: PropTypes.number,
};

InfinityList.defaultProps = {
  height: 180,
  itemSize: 30,
  width: 313,
};
