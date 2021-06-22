import React from 'react'
import Layout from '../../components/Layout'
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import Input from '../../components/Input'


function Signup() {
    return (
        <>
            <Layout>
                <Container>
                    <Row style={{ marginTop: "5rem" }}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form>
                                <Row>
                                    <Col md={{ span: 6 }}>
                                        <Input
                                            controlId={"formBasicFirstName"}
                                            lable={"First Name"}
                                            type={"text"}
                                            placeholder={"First Name"}
                                            value={""}
                                            onChange={() => {}}
                                            errorMessage={""} />
                                    </Col>
                                    <Col md={{ span: 6 }}>
                                        <Input
                                            controlId={"formBasicLastName"}
                                            lable={"Last Name"}
                                            type={"text"}
                                            placeholder={"Last Name"}
                                            errorMessage={""}
                                        />
                                    </Col>
                                </Row>

                                <Input
                                    controlId={"formBasicEmail"}
                                    lable={"Email address"}
                                    type={"email"}
                                    placeholder={"Enter email"}
                                    errorMessage={""}
                                />

                                <Input
                                    controlId={"formBasicPassword"}
                                    lable={"Password"}
                                    type={"password"}
                                    placeholder={"Password"}
                                    errorMessage={""}
                                />

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </>
    )
}

export default Signup
