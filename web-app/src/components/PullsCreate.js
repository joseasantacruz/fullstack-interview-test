import React,{ useEffect, useState}  from 'react';
import './App.css'; 
import Loader from "react-loader-spinner";
import { useHistory } from "react-router-dom";
 
export function PullsCreate(props) {
    const history = useHistory();
    const [result, setResult] = useState()
    const [isFetchFinished, setIsFetchFinished] = useState(false)
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [base, setBase] = useState('')
    const [compare, setCompare] = useState('') 
    useEffect(() =>{
        doQuery()
            .then(d => {
                setResult(d?.branches);
                setIsFetchFinished(true);
                console.log('branches: ', d?.branches);
                setBase(d?.branches[0]);
                setCompare(d?.branches[0]);})
    }, [])
    function Save() {
        if (base===compare)
            alert("You’ll need to use two different branch names to get a valid pull request.");
        else{
            createPull('{"author": "'+author+'","title": "'+title+'","description": "'+description+'","status": "Open","base": "'+base+'","compare": "'+compare+'"}');
            console.log('{"author": "'+author+'","title": "'+title+'","description": "'+description+'","status": "Open","base": "'+base+'","compare": "'+compare+'"}');
            history.push("/pulls");
        }
      }

      function Merge() {
        if (base===compare)
            alert("You’ll need to use two different branch names to get a valid pull request.")
        else{
            doMerge(base,compare)
                    .then(d => {
                if(d.success){
                    createPull('{"author": "'+author+'","title": "'+title+'","description": "'+description+'","status": "Merged","base": "'+base+'","compare": "'+compare+'"}');
                    console.log('Merge response: '+d.merge_success);
                    history.push("/pulls");
                }
                else{
                    alert(d.merge_message+ '\n \n The Pull Request will be saved with Open status.'    );
                    console.log('Merge message: '+d.merge_message );
                    Save();
                }
                })
       }
      }
    if(!isFetchFinished) return <Loader />;
    return (
        <div className="App-body"> 
            <h2 className="title"> Create a Pull Request </h2>  
 


            <form style={{marginLeft:'2%'}}>
                <label>
                    Author: 
                    <input type="text" name="author" onChange={event => setAuthor(event.target.value)}/>
                </label>
                <br />
                <label>
                    Title:
                    <input type="text" name="title" onChange={event => setTitle(event.target.value)}/>
                </label>
                <br />
                <label>
                    Description: 
                    <textarea style={{marginTop:'5px'}}
                        onChange={event => setDescription(event.target.value)}
                    />
                </label>
                <br />
                <label>
                    Base:
                    <select value={base} onChange={event => setBase(event.target.value)}>
                        {result.map((branch) => <option key={branch}>{branch}</option>)}
                    </select>
                </label>
                <br />
                <label>
                    Compare: 
                    <select value={compare} onChange={event => setCompare(event.target.value)}>
                        {result.map((branch) => <option key={branch}>{branch}</option>)}
                    </select>
                </label>
            </form>
            <div className="App-body">
                <a className="boton-link" onClick={Save} style={{padding: '1%',margin:'2%'}}>Save</a> 
                <a className="boton-link" onClick={Merge} style={{padding: '1%',margin:'2%'}}>Merge</a> 
            </div>
        </div>
  );
  
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

function createPull(CreateBody) {
    console.log("CreateBody: ",CreateBody);
    var requestOptions = {
        method: 'POST',
        redirect: 'follow', 
        body: CreateBody,
      };      
    return fetch(`http://127.0.0.1:8000/pull`,requestOptions)
        .then(response=> console.log('Pull creado. ', response)) 
        .catch(error => console.log('error', error));
  }

function doMerge(base,compare) {
    console.log("Base: ",base," Compare: ",compare);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow', 
      };      
    return fetch(`http://127.0.0.1:8000/merge/${base}/${compare}`,requestOptions)
        .then(response=>response.json()) 
        .catch(error => console.log('error', error));
  }