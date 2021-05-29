import React,{ useEffect, useState}  from 'react';
import './App.css'; 
import Loader from "react-loader-spinner";
 
export function Pulls(props) { 
    const [result, setResult] = useState()
    const [isFetchFinished, setIsFetchFinished] = useState(false);
    useEffect(() =>{
        doQuery()
            .then(d => {
                setResult(d);
                setIsFetchFinished(true);
                console.log('pulls: ', d);})
    }, [])
    if(!isFetchFinished) return <Loader />;
    return (
        <div className="App-body"> 
            <h2 className="title"> Pull Requests </h2> 
            <div className="App-body">
                <a className="boton-link" href="/pull/create">Create</a> 
            </div>

            <div className="App-body" style={{marginTop:'10%'}}>
                <GetPulls list={result || []} /> 
            </div>
 

        </div>
  );
  
  
}  
function GetPulls(props) {
    console.log("Pulls list: ", props.list) 
    function Close(pull) {
            updatePull(pull.id,'{"author": "'+pull.author+'","title": "'+pull.title+'","description": "'+pull.description+'","status": "Closed","base": "'+pull.base+'","compare": "'+pull.compare+'"}')
            console.log("pull id: ",pull.id)  
            window.location.reload();
      }   
    return  <div> 
        { props.list.map(pull  => <div key={pull.id}>
        <p style={{marginLeft:'10%'}}> Author: {pull.author}  </p> 
        <p style={{marginLeft:'10%'}}> Title: {pull.title}  </p> 
        <p style={{marginLeft:'10%'}}> Description: {pull.description}  </p> 
        <p style={{marginLeft:'10%'}}> Status: {pull.status}  {pull.status=== 'Open' && <a style={{padding: '5px',float: 'inherit'}} className="boton-link" onClick={() =>Close(pull)}>Close</a>}</p> 
        <p style={{marginLeft:'10%'}}> Branch base: {pull.base}  </p> 
        <p style={{marginLeft:'10%'}}> Branch compare: {pull.compare}  </p> 
          
        <br />
    </div> 
        )}
    </div> 
  
}
function doQuery() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow', 
      };      
    return fetch('http://127.0.0.1:8000/pulls',requestOptions)
        .then(response=>response.json()) 
        .catch(error => console.log('error', error));
  }

  function updatePull(PullId,UpdateBody) {
    console.log("UpdateBody: ",UpdateBody);
    var requestOptions = {
        method: 'PUT',
        redirect: 'follow', 
        body: UpdateBody,
      };      
    return fetch(`http://127.0.0.1:8000/pull/${PullId}`,requestOptions)
        .then(response=> console.log('Pull actualizado. ', response)) 
        .catch(error => console.log('error', error));
  }