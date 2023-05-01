import React from 'react'

import { Accordion } from 'react-bootstrap'

const AccordionCustom = ({ items }) => {

    const renderList = () => {
        const renderItems = items.map((item, index) => {
            const { question, answer } = item
            return (
                <Accordion.Item eventKey={index} key={index}>
                    <Accordion.Header>{ question }</Accordion.Header>
                    <Accordion.Body>
                        { answer }
                    </Accordion.Body>
                </Accordion.Item>
            )
        })

        return (
            <Accordion defaultActiveKey="0">
                { renderItems }
            </Accordion>
        )
    }

    return (
        <>
            { renderList() }
        </>
    )
}

export default AccordionCustom