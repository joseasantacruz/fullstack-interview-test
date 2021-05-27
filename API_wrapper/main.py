from fastapi import FastAPI
from typing import Optional
from git import Repo
from fastapi.middleware.cors import CORSMiddleware


repo = Repo('../')

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Services": [{"Branches":"/branches"},{"Commits":"/branch/{name}/commits"},{"Commits details":"/commit/{hash}"}]}


@app.get("/branches")
def read_root():
    branches = []
    for branch in repo.git.branch('-r').split('\n'):
        if branch.find('HEAD')<0:
            branches.append(branch.strip(' ')[branch.find('/')-1:])
    return {    "branches": branches }

@app.get("/branch/{name}/commits")
def read_item(name: str):
    repo.git.checkout(name)
    commits = []
    id,author,date,message='','','',''
    for line in repo.git.log().split('\n'):        
        if (line.find('commit ')==0):
            id,author,date,message=line.strip('commit').strip(' '),'','',''
        elif(line.find('Author: ')==0):
            author=line.strip('Author:').strip(' ')
        elif(line.find('Date: ')==0):
            date=line.strip('Date:').strip(' ')
        elif(line.find(' ')==0):
            if message!='':
                message+=' - '+line.strip(' ')
            else:
                message=line.strip(' ')
        if (id!='' and author!='' and date!='' and message!=''):                    
            commits.append({"Id": id,"Author": author, "Date": date, "Message": message})
            id,author,date,message='','','',''
    return {"commits": commits}

@app.get("/commit/{hash}")
def read_item(hash: str):
    commit = []
    line_count=0
    changed_count=0
    id,author,date,message='','','',''
    for line in repo.git.show(hash).split('\n'):
        if line!='':
            if (line_count==0):
                line_count+=1
                id=line.strip('commit').strip(' ')
            elif(line_count==1):
                line_count+=1
                author=line.strip('Author:').strip(' ')
            elif(line_count==2):
                line_count+=1
                date=line.strip('Date:').strip(' ')
            elif(line_count==3):
                line_count+=1
                message=line.strip(' ')
            elif (line.find('diff ')==0):
                changed_count+=1
    commit.append({"Id": id,"Author": author, "Date": date, "Message": message,"Files changed":changed_count})
    return {"commit": commit}