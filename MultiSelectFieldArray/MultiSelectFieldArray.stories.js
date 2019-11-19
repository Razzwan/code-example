import React from "react";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { reduxForm, FieldArray } from "redux-form";

import MultiSelectFieldArray from "@components/MultiSelectFieldArray";
import CenterDecorator from "@decorators/CenterDecorator";
import FormDecorator from "@decorators/FormDecorator";
import { arrayLength } from "@utils/validators";

const items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(i => ({
  value: `item_${i}`,
  label: i % 2 === 0 ? `Very very ${i % 4 ? "very" : ""} long label for item with index ${i}` : `Label ${i}`,
  disabled: i % 3 !== 0,
}));

const MultiSelectField = ({ handleSubmit, searchTerm }) => {
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexFlow: "column", alignItems: "center" }}>
      <div style={{ padding: "20px 150px" }}>
        <FieldArray
          component={MultiSelectFieldArray}
          getValue={i => i.value}
          name="items"
          items={items}
          total={items.length}
          loadMore={action("load more")}
          searchTerm={searchTerm}
          validate={[arrayLength("Select at least one brand")]}
        />
      </div>
      <button type="submit">Submit form</button>
    </form>
  );
};

const MyForm = reduxForm({
  form: "test",
  onSubmit: action("Submit"),
})(MultiSelectField);

storiesOf("MultiSelect/FieldArray", module)
  .addDecorator(FormDecorator)
  .addDecorator(CenterDecorator)
  .add("default", () => <MyForm />)
  .add('searchTerm = "Very very"', () => <MyForm searchTerm="Very very" />);
