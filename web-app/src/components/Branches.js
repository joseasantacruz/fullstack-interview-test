import React,{ useEffect, useState}  from 'react';
import './App.css'; 
import Loader from "react-loader-spinner";
 
export function Branches(props) {
    
    const [result, setResult] = useState()
    const [isFetchFinished, setIsFetchFinished] = useState(false);
    useEffect(() =>{
        doQuery()
            .then(d => {setResult(d?.branches);setIsFetchFinished(true);console.log('branches: ', d?.branches);})
    }, [])
    if(!isFetchFinished) return <Loader />;
    return (
        <div className="App-body"> 
            <h2 className="title"> Branches </h2>  
            <GetBranches list={result || []} /> 
 

        </div>
  );
  
}  
function GetBranches(props) {
    console.log("branches list: ", props.list)   
    return <div> 
        { props.list.map(branch  =>
        <h4 key={branch} style={{marginLeft:'10%'}}>
            <a className="App-link"
            href={'http://127.0.0.1:3000/commits/'+branch}>{branch} </a> 
        </h4> 
        )}
    </div> 
  
}

function doQuery() {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow', 
      };      
    return fetch('http://127.0.0.1:8000/branches',requestOptions)
        .then(response=>response.json()) 
        .catch(error => console.log('error', error));
  }