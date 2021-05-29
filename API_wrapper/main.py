from fastapi import FastAPI 
from db.db import metadata, database, engine
from models.pulls import pulls
from git import Repo
from fastapi.middleware.cors import CORSMiddleware


repo = Repo('../')

app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

app.include_router(pulls)

@app.get("/")
def read_root():
    return {"Services": [{"Branches":"/branches"},{"Commits":"/branch/{name}/commits"},{"Commits details":"/commit/{hash}"}]}


@app.get("/branches")
def read_branches():
    branches = []
    for branch in repo.git.branch('-r').split('\n'):
        if branch.find('HEAD')<0:
            branches.append(branch.strip(' ')[branch.find('/')-1:])
    return {"branches": branches }

@app.get("/branch/{name}/commits")
def read_commits(name: str): 
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
    if (name!='master'):
        repo.git.checkout('master')
    return {"commits": commits}

@app.get("/commit/{hash}")
def read_commit(hash: str):
    commit = ''
    line_count=0
    changed_count=0
    id,author,date,message='','','',''
    for line in repo.git.show(hash).split('\n'):
        if line!='':
            if (line_count==0 and line.find('commit ')==0):
                line_count+=1
                id=line.strip('commit').strip(' ')
            elif(line_count==1 and line.find('Author: ')==0):
                line_count+=1
                author=line.strip('Author:').strip(' ')
            elif(line_count==2 and line.find('Date: ')==0):
                line_count+=1
                date=line.strip('Date:').strip(' ')
            elif(line_count==3):
                line_count+=1
                message=line.strip(' ')
            elif (line.find('diff ')==0):
                changed_count+=1
    if (changed_count==0):
        changed_count=1
    commit={"Id": id,"Author": author, "Date": date, "Message": message,"Changes":changed_count}
    return {"commit": commit}

@app.get("/merge/{base}/{compare}")
def do_merge(base: str,compare: str):
    branches = []
    for branch in repo.git.branch('-r').split('\n'):
        if branch.find('HEAD')<0:
            branches.append(branch.strip(' ')[branch.find('/')-1:])
    if base not in branches:
        merge_message='Branch '+base+' is not a valid branch in the repo.'
        success=False
    elif compare not in branches:
        merge_message='Branch '+compare+' is not a valid branch in the repo.'
        success=False
    else:
        try:
            repo.git.checkout(base)
            success=True
            merge_message=repo.git.merge(compare)
        except :
            success=False
            merge_message="An error occurred when do the merge between branches "+base+" and "+compare+"."
    return {"success":success,"merge_message": merge_message}