import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import environment from "../../../../environments/environment";

import { Container } from "@mui/material";
// import DeleteIcon from '@mui/icons-material/Delete';

import { CKEditor } from "ckeditor4-react";
import { DropzoneArea } from "material-ui-dropzone";

import { createResearchGroup } from "../../../../store/admin.researchGroupSlice";

import { STATUS_ADD_SUCCESS } from "../../../../status.messsage";

import Checkbox from "../Checkcbox";
import Combobox from "../Combobox";

import logo from "../../../../assets/logo.png";

const TYPE_TEXT = "text";
const TYPE_TEXTAREA = "textarea";
const TYPE_EDITOR = "editor";
const TYPE_COMBOBOX = "combobox";
const TYPE_CHECKBOX = "checkbox";
const TYPE_IMAGE = "image";

const filebrowserUploadUrl = environment.url.java + "/upload-file";
const removeButtons = "PasteFromWord";

const AddGroup = (props) => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [value, setValue] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [isShowChipMember, setShowChipMember] = useState(false);
  const handleChange = (field, value) => {
    setValue((previousState) => ({ ...previousState, [field]: value }));
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { columns } = props;

  const renderTextFields = () => {
    const usersFormat = columns
      .filter((field) => field.editable && field.type === TYPE_TEXT)
      .map((field,index) => {
        return (
          <div className="form-group" key={index}>
            <label htmlFor={field.field} className="form-label">
              {field.headerName}
            </label>
            <input
              id={field.field}
              label={field ? field.headerName : ""}
              className="form-control"
              onChange={(e) => handleChange(field.field, e.target.value)}
            />
          </div>
        );
      });

    return <div className="flex flex-col gap-4">{usersFormat}</div>;
  };

  const renderTextAreaFields = () => {
    return columns
      .filter((field) => field.editable && field.type === TYPE_TEXTAREA)
      .map((field,index) => {
        return (
          <React.Fragment key={index}>
            <label htmlFor={field.field} className="form-label">
              {field.headerName}
            </label>
            <textarea
              className="form-control"
              id={field.field}
              rows={6}
              rowsMax={10}
              defaultValue={props.group ? props.group[field.field] : ""}
              onChange={(e) => handleChange(field.field, e.target.value)}
            />
          </React.Fragment>
        );
      });
  };

  const handleCKEditorChange = (event, editor) => {
    const name = event.editor.name;
    const data = event.editor.getData();

    handleChange(name, data);
  };

  const renderEditorFields = () => {
    const usersFormat = columns
      .filter((field) => field.isShow && field.type === TYPE_EDITOR)
      .map((field,index) => {
        return (
          <div className="flex flex-col gap-4 mt-4" key={index}>
            <section className="font-bold">{field.headerName}</section>
            <CKEditor
              id={field.field}
              name={field.field}
              activeClass={field.field}
              // initData={project ? project[field.fieldName] : ''}
              config={{
                filebrowserUploadUrl: filebrowserUploadUrl,
                removeButtons: removeButtons,
                isReadOnly: true,
                height: 400,
                extraPlugins: [
                  ["embed,autoembed,language,justify,colorbutton,font"],
                ],
                embed_provider:
                  "//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}",
              }}
              onChange={handleCKEditorChange}
            />
          </div>
        );
      });

    return <>{usersFormat}</>;
  };

  const renderCheckboxFields = () => {
    const usersFormat = columns
      .filter((field) => field.editable && field.type === TYPE_CHECKBOX)
      .map((field,index) => {
        return (
          <Checkbox
            label={field.headerName}
            fieldName={field.field}
            isChecked={false}
            onCheckboxChange={onCheckboxEnableChange}
            key={index}
          />
        );
      });

    return <div className="flex gap-4">{usersFormat}</div>;
  };

  const onImageChange = (files) => {
    console.log("onImageChange")
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("upload", files[0]);

    axios
      .post(filebrowserUploadUrl, formData, config)
      .then((response) => {
        const imgSrc = response.data.url;

        if (response.data) {
          handleChange("groupImage", imgSrc);
        } else {
          return alert("failed to upload file");
        }
      });
  };

  const renderImageFields = () => {
    const usersFormat = columns
      .filter((field) => field.editable && field.type === TYPE_IMAGE)
      .map((field,index) => {
        return (
          <div className="flex flex-col gap-4 mt-4" key={index}>
            <section className="font-bold">{field.headerName}</section>
            <DropzoneArea
              acceptedFiles={["image/*"]}
              dropzoneText={"Drag and drop an image here or click"}
              onChange={onImageChange}
              initialFiles={[props.project ? props.project.productImage : logo]}
            />
          </div>
        );
      });

    return <div className="flex flex-col gap-4">{usersFormat}</div>;
  };

  const renderComboboxFields = () => {
    const usersFormat = columns
      .filter((field) => field.editable && field.type === TYPE_COMBOBOX)
      .map((field,index) => {
        return (
          <Combobox
            label={field.headerName}
            data={props[field.data]}
            selectedIndex={1}
            onChecked={
              field.field === "domainId" ? onDomainChange : onRoleChange
            }
            key={index}
          />
        );
      });

    return <div className="flex flex-col gap-5">{usersFormat}</div>;
  };

  const onDomainChange = (domainId) => {
    handleChange("domainId", domainId);
  };
  const onRoleChange = (roleId) => {
    handleChange("roleId", roleId);
  };

  const onCheckboxEnableChange = (fieldName, checked) => {
    handleChange(fieldName, checked);
  };

  const onSubmitForm = (event) => {
    event.preventDefault();

    const userDataLocalStorage = localStorage.getItem("userData");
    const user = JSON.parse(userDataLocalStorage);
    const updateValue = { ...value, userId: user.data.id };

    dispatch(createResearchGroup(updateValue));

    history.push("/admin/research-groups");
    alert.success(STATUS_ADD_SUCCESS);
  };

  const onCancelForm = () => {};

  return (
    <>
      <Container maxWidth="lg" className="p-2">
        <div className="mt-2">{renderTextFields()}</div>

        <div className="mt-3">{renderTextAreaFields()}</div>

        <div className="flex flex-col gap-4">
          {renderComboboxFields()}
          {renderCheckboxFields()}
        </div>

        <div>{renderEditorFields()}</div>

        <div>{renderImageFields()}</div>

        <div className="d-flex justify-content-end gap-2 my-2">
          <button
            onClick={(e) => onSubmitForm(e)}
            className="px-4 py-2 text-white bg-success rounded-3"
          >
            Thêm
          </button>
          <button
            onClick={(e) => onCancelForm(e)}
            className="px-4 py-2 text-white bg-danger rounded-3"
          >
            Hủy
          </button>
        </div>
      </Container>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {};
};

export default connect(mapStateToProps, {})(AddGroup);
