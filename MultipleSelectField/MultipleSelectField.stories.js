import React from "react";

import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Field, reduxForm } from "redux-form";

import MultipleSelectField from "@components/MultipleSelectField";
import CenterDecorator from "@decorators/CenterDecorator";
import FormDecorator from "@decorators/FormDecorator";

const Spaces = (spaces = 1) => {
  const string = <span>&nbsp;&nbsp;&nbsp;</span>;
  let prepared = [];
  for (let i = 0; i <= spaces; i++) {
    prepared.push(string);
  }
  return prepared;
};

const items = [...Array(6)].map((el, index) => ({
  id: index + 1,
  label: "label " + index,
}));

const assignees = [...Array(6)].map((el, index) => ({
  id: index,
  email: `email${index}@mail.com`,
}));

const MyComponent = () => (
  <form onSubmit={action("submit form")}>
    <div style={{ width: 200 }}>
      <Field dense name="label" component={MultipleSelectField} items={items} />
      <Field name="assignees" component={MultipleSelectField} items={assignees} getLabel={i => i.email} />
    </div>
  </form>
);

const MyForm = reduxForm({
  form: "test",
})(MyComponent);

storiesOf("Legacy/ForRemoving/MultipleSelect/Field", module)
  .addDecorator(FormDecorator)
  .addDecorator(CenterDecorator)
  .add("default", () => (
    <div style={{ maxWidth: 600 }}>
      <div>
        <h3>Usage:</h3>
        <div>
          <h4>{'import { Field } from "redux-form";'}</h4>
          <h4>{'import MultipleSelectField from "@components/MultipleSelectField";'}</h4>
          <h4>&nbsp;</h4>
          <h4>{"const MyComponent = ({ handleSubmit }) => ("}</h4>
          <h4>
            {Spaces(1)}
            {"<form onSubmit={handleSubmit}>"}
          </h4>
          <h4>
            {Spaces(3)}
            {'<Field component="{MultipleSelectField}" items="{[{id:" 1, label: "first"}}]} />'}
          </h4>
          <h4>
            {Spaces(1)}
            {"</form>"}
          </h4>
          <h4>{");"}</h4>
        </div>
      </div>
      <MyForm />
    </div>
  ));
