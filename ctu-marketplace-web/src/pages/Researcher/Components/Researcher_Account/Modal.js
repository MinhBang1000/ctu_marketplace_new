import React, { useState } from "react";

import { Button, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const CustomModal = ({ showModal, setShowModal, handleSubmit }) => {
  const [value, setValue] = useState();

  const { t } = useTranslation("common");
  const userId = useSelector(
    (state) => state.auth?.data?.userProfile?.data?.id
  );

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValue((previousState) => ({ ...previousState, [name]: value }));
  };

  const handleSubmitForm = () => {
    const newPassword = value["newPassword"].replace(/\s+/g, "");
    const confirmPassword = value["confirmPassword"].replace(/\s+/g, "");

    if (newPassword === confirmPassword) {
      const formValues = {
        oldPassword: value["oldPassword"],
        newPassword: value["newPassword"],
      };

      setShowModal(false);
      handleSubmit(userId, formValues);
    } else alert("Mật khẩu không khớp");
  };

  const modalConfig = {
    name: "password",
    body: (
      <>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            {t("researcher.home.change-pass.form.oldPassword")}
          </label>
          <input
            name="oldPassword"
            type="password"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            {t("researcher.home.change-pass.form.newPassword")}
          </label>
          <input
            name="newPassword"
            type="password"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="repassword" className="form-label">
            {t("forgetPassword.modal.password.confirmPassword")}
          </label>
          <input
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            className="form-control"
          />
        </div>
      </>
    ),
  };

  const renderModal = (modal) => {
    if (showModal) {
      return (
        <Modal
          scrollable={true}
          show={showModal}
          style={{ display: "block" }}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <div className="text-black-50">
                {t("researcher.home.change-pass.title")}
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{modal.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleClose}>
              {t("researcher.home.change-pass.form.btnCancel")}
            </Button>
            <Button variant="success" onClick={handleSubmitForm}>
              {t("researcher.home.change-pass.form.btnOk")}
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }

    return null;
  };

  const renderComponent = () => {
    if (showModal) {
      return <>{renderModal(modalConfig)}</>;
    }
  };

  return <>{renderComponent()}</>;
};

export default CustomModal;
