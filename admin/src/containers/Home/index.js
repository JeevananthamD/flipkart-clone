import React from 'react'
import Layout from '../../components/Layout'
import { Jumbotron } from "react-bootstrap";

function Home(props) {
    return (
        <>
            <Layout>
                <Jumbotron className="text-center">
                    <h1>Welcome to Admin Dashboard</h1>
                </Jumbotron>
            </Layout> 
        </>
    )
}

export default Home
