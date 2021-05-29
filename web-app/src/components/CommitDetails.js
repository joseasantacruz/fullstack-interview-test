import React,{ useEffect, useState}  from 'react';
import './App.css'; 
import {useParams} from "react-router-dom";
import Loader from "react-loader-spinner";
 
export function CommitDetails(props) {
    const {CommitHash,CommitMessage} = useParams()
    const [result, setResult] = useState()
    const [isFetchFinished, setIsFetchFinished] = useState(false);
    useEffect(() =>{
        doQuery(CommitHash)
            .then(d => {setResult(d?.commit);setIsFetchFinished(true);console.log('commit: ', d?.commit);})
    }, [ ])
    if(!isFetchFinished) return <Loader />;
    return (
        <div className="App-body"> 
            <h2 className="title"> Commit "{CommitMessage}"  </h2>  
 
            <GetCommit commit={result ||[]} />
            
        </div>
  );
}  
  

function GetCommit(props) {
    console.log("GetCommit: ", props.commit)   
    return <div> 
            <p style={{marginLeft:'10%'}}> Commit message: {props.commit.Message}    </p> 
            <p style={{marginLeft:'10%'}}> Timestamp: {props.commit.Date}    </p> 
            <p style={{marginLeft:'10%'}}> Files changed : {props.commit.Changes}    </p> 
            <p style={{marginLeft:'10%'}}> Author : {props.commit.Author}    </p> 
    </div> 
  
}

function doQuery(CommitHash) {
    console.log("CommitHash: ",CommitHash);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow', 
      };      
    return fetch(`http://127.0.0.1:8000/commit/${CommitHash}`,requestOptions)
        .then(response=>response.json()) 
        .catch(error => console.log('error', error));
  }