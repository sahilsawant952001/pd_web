import React, { useState } from 'react';
import { useEffect } from 'react';

import { Link } from "react-router-dom";
import Spinner from '../Spinner/Spinner';

function PreviousTestsList(params) {

    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [tests, setTests] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const url = `http://localhost:8000/parkinson-tests?email=${email}`;
        fetch(url)
           .then((response) => response.json())
           .then((data) => {
                console.log(data)
                setIsLoading(false);
                setTests(data.tests);
           })
           .catch((err) => {
                console.log(err)
                alert('Some Error Occurred While Fetching Your Previous Tests')
           });
    },[])

    const testList = tests && tests.map((test) => 
        <div class="row">
            <div class="col border" style={{padding:"2%"}}>
                <Link to={{pathname:`/previous-tests/${test.testId}`, state:{...test}}}>{test.testId}</Link>
            </div>
            <div class="col border" style={{padding:"2%"}}>
                {new Date(test.date).toDateString()}
            </div>
        </div>
    )

    return <div>
                {
                    isLoading === true ? <Spinner/> : <div class="container text-center" style={{margin:"5% auto 10% auto"}}>
                    <div class="row">
                        <div class="col" style={{padding:"2%"}}>
                            <h3 style={{color:"#38015c"}}>Previous Test ID</h3>
                        </div>
                        <div class="col" style={{padding:"2%"}}>
                            <h3 style={{color:"#38015c"}}>Previous Test Date</h3>
                        </div>
                        {testList}
                    </div>
                </div>
                }
           </div>
}

export default PreviousTestsList;