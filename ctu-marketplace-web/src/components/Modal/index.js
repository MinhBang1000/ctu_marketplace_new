import React, { useEffect } from 'react'

import { Button, Modal } from 'react-bootstrap'

const CustomModal = ({ isFormValid, setValidForm, modalConfig }) => {
    const { title, body, closeButton } = modalConfig;

    useEffect(() => {
        setValidForm(isFormValid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  
    const handleClose = () => setValidForm(true);
  
    return (
        <>
            <Modal show={!isFormValid}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        { title ? title : 'Modal title' }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    { body ? body : 'Woohoo, you are reading this text in a modal!' }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        { closeButton ? closeButton : 'Close' }
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </>
    );
  }
  
export default CustomModal