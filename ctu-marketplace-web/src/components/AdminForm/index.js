import "./index.css";

import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import { useDialog } from "react-st-modal";

import Combobox from "./Combobox";

const TYPE_TEXT = "text";
const TYPE_TEXTAREA = "textarea";
const TYPE_COMBOBOX = "combobox";
const TYPE_EDITOR = "editor";

const FormEditField = ({
  type,
  formConfig,
  initialValue,
  defaultCompobox,
  fields,
  data,
  onSubmit,
}) => {
  const [value, setValue] = useState(initialValue ? initialValue : (defaultCompobox ?? null));
  const dialog = useDialog();

  const handleChange = (field, changedValue) => {
    setValue((previousState) => ({ ...previousState, [field]: changedValue }));
  };

  useEffect(() => {
    const test = document.getElementsByClassName(
      "stf__dialogClose Modal-module_modalCloseIcon__20QFz"
    );
    test[0].classList.add("custom_st_modal_close_button");
  }, []);

  const renderFields = () => {
    if (fields) {
      return fields
        .filter((field) => field.editable && field.type === TYPE_TEXT)
        .map((field,index) => {
          return (
            <div className="form-group" key={index}>
              <label>{field ? field.headerName : ""}</label>
              <input
                id={field.field}
                className="form-control"
                disabled={field.isDisabled && type === 'edit'}
                maxLength={field.maxLength}
                defaultValue={
                  initialValue
                    ? field.isObject
                      ? initialValue[field.field][field.getBy]
                      : initialValue[field.field]
                    : ""
                }
                onChange={(e) => handleChange(field.field, e.target.value)}
              />
            </div>
          );
        });
    }
    return null;
  };

  const renderTextAreaFields = () => {
    if (fields) {
      return fields
        .filter((field) => field.editable && field.type === TYPE_TEXTAREA)
        .map((field,index) => {
          return (
            <div className="form-group" key={index}>
              <label>{field ? field.headerName : ""}</label>
              <textarea
                className="form-control"
                disabled={field.isDisabled}
                defaultValue={initialValue ? initialValue[field.field] : ""}
                onChange={(e) => handleChange(field.field, e.target.value)}
              ></textarea>
            </div>
          );
        });
    }
    return null;
  };

  const onComboboxChange = (roleId) => {
    handleChange("roleId", roleId);
  };

  const renderComboboxFields = () => {
    let usersFormat = null;
    if (fields) {
      usersFormat = fields
        .filter((field) => field.editable && field.type === TYPE_COMBOBOX)
        .map((field) => {
          return (
            <Combobox
              label={field.headerName}
              data={data}
              selectedIndex={initialValue ? initialValue[field.field].id : 1}
              onChecked={onComboboxChange}
            />
          );
        });
    }

    return <div className="flex flex-col gap-5">{usersFormat}</div>;
  };

  const renderEditorField = () => {
    if (fields) {
      return fields
        .filter((field) => field.editable && field.type === TYPE_EDITOR)
        .map((field) => {
          return (
            <>
              <label>{field.headerName}</label>
              <div
                dangerouslySetInnerHTML={{
                  __html: initialValue ? initialValue[field.field] : "",
                }}
              />
            </>
          );
        });
    }

    return null;
  };

  const onSubmitForm = (event) => {
    event.preventDefault();
    dialog.close(value);
    onSubmit(value);
  };
  const onCancelForm = (event) => {
    event.preventDefault();
    dialog.close(value);
  };

  const renderActions = () => {
    return (
      <div className="d-flex justify-content-end gap-2 my-2">
        {formConfig ? (
          <>
            <button
              onClick={(e) => onSubmitForm(e)}
              className={`btn rounded-3 ${
                formConfig?.type === "edit" ? "btn-warning" : "btn-success"
              }`}
            >
              {formConfig?.btnText?.btnOk}
            </button>
            <button
              onClick={(e) => onCancelForm(e)}
              className={`btn btn-secondary rounded-3`}
            >
              {formConfig?.btnText?.btnCancel}
            </button>
          </>
        ) : null}
      </div>
    );
  };

  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "60ch" },
      }}
      noValidate
      autoComplete="off"
      className="d-flex flex-column align-items-center"
    >
      {renderFields()}
      {renderTextAreaFields()}
      {renderComboboxFields()}
      {renderEditorField()}
      {renderActions()}
    </Box>
  );
};

export default FormEditField;
