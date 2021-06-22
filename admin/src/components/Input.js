import React from 'react'
import { Form } from "react-bootstrap";


function Input(props) {
    const { controlId, lable, type, placeholder, value, onChange, errorMessage } = props;
    return (
        <>
            <Form.Group controlId={controlId}>
                <Form.Label>{lable}</Form.Label>
                <Form.Control
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                <Form.Text className="text-muted">{errorMessage}</Form.Text>
            </Form.Group>
        </>
    )
}

export default Input
