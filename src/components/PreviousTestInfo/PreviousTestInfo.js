import React from 'react';

import { useLocation } from 'react-router-dom';

function PreviousTestInfo(props){

    const location = useLocation();

    const data = location.state;

    console.log(data)
    
    return  <div >
                <h2 style={{margin:"3% auto 3% 0", textAlign:"center"}}><span style={{color:"#38015c"}}>Result of Test</span> : {data.testId}</h2>
                <div class="card" style={{padding:"2%",width: "40%", marginLeft:"auto", marginRight:"auto", display:"block", marginTop:"2%", marginBottom:"2%"}}>
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <img src={`${data.imgUrl}`} class="card-img-top" alt="pd-img"/>
                            </div>
                            <div class="col">
                                <div class="card-body">
                                    <h6 class="card-text">Date: {new Date(data.date).toDateString()}</h6>
                                    <h6 class="card-text">Time: {new Date(data.date).toTimeString().substring(0,9)}</h6>
                                    <h6 class="card-text">Type: Spiral</h6>
                                    <h6 class="card-text">Result: {data.result==='parkinson' ? <span style={{color:"red"}}>Parkinson</span>:<span style={{color:"green"}}>Healthy</span>}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
}

export default PreviousTestInfo;