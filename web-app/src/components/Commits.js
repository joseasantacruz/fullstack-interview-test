import React,{ useEffect, useState}  from 'react';
import './App.css'; 
import {useParams} from "react-router-dom";
import Loader from "react-loader-spinner";
 
export function Commits(props) {
    const {BranchName} = useParams()
    const [result, setResult] = useState()
    const [isFetchFinished, setIsFetchFinished] = useState(false);
    useEffect(() =>{
        doQuery(BranchName)
            .then(d => {setResult(d?.commits);console.log('commits: ', d?.commits);setIsFetchFinished(true);})
    }, [ ])
    if(!isFetchFinished) return <Loader />;
    return (
        <div className="App-body"> 
            <h2 className="title"> Commits in branch "{BranchName}"</h2> 
            <GetCommits list={result ||[]} />
            
        </div>
  );
}  
  

function GetCommits(props) {
    console.log("commits list: ", props.list)   
    return <div> 
        { props.list.map(commit  =><div>
            <p style={{marginLeft:'10%'}}> Commit message: <a className="App-link"
                href={'http://127.0.0.1:3000/commit/'+commit.Id+'/'+commit.Message}>{commit.Message} </a>     </p> 
                <p style={{marginLeft:'10%'}}> Author : {commit.Author}    </p> 
            <p style={{marginLeft:'10%'}}> Timestamp: {commit.Date}    </p> 
            <br />
        </div>  
        
        )}
    </div> 
  
}

function doQuery(BranchName) {
    console.log("BranchName: ",BranchName);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow', 
      };      
    return fetch(`http://127.0.0.1:8000/branch/${BranchName}/commits`,requestOptions)
        .then(response=>response.json()) 
        .catch(error => console.log('error', error));
  }