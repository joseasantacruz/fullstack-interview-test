from fastapi.testclient import TestClient

from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"Services": [{"Branches":"/branches"},{"Commits":"/branch/{name}/commits"},{"Commits details":"/commit/{hash}"}]}
    
def test_read_main_error():
    response = client.get("/main")
    jsonResponse=response.json()
    assert response.status_code == 404
    assert jsonResponse["detail"]=="Not Found"


def test_read_branches():
    response = client.get("/branches")
    jsonResponse=response.json()
    branches = jsonResponse["branches"]
    assert response.status_code == 200 
    assert  'master' in branches and 'alfonsolzrg-patch-1' in branches and 'alfonsolzrg-add-instructions' in branches

def test_read_commits():
    response = client.get("/branch/master/commits")
    jsonResponse=response.json()
    commits = jsonResponse["commits"]
    exists=False
    for commit in commits:
        if commit["Id"]=='94181465ecc02fbc9f3d0ad25d9f6c59e166a3e1':
            exists=True
    assert response.status_code == 200 
    assert  exists  

def test_read_commits_error():
    response = client.get("/branch/master/commits")
    jsonResponse=response.json()
    commits = jsonResponse["commits"]
    exists=False
    for commit in commits:
        if commit["Id"]=='94181465ecc02fbc9f3d0ad25d9f6c59e166a311':
            exists=True
    assert response.status_code == 200 
    assert  not exists  


def test_read_commit():
    response = client.get("/commit/94181465ecc02fbc9f3d0ad25d9f6c59e166a3e1")
    jsonResponse=response.json()
    commit = jsonResponse["commit"]
    assert response.status_code == 200 
    assert  commit["Changes"]==2 and commit["Message"]=="Initial commit"


def test_read_commit_error():
    response = client.get("/commit/94181465ecc02fbc9f3d0ad25d9f6c59e166a3e1")
    jsonResponse=response.json()
    commit = jsonResponse["commit"]
    assert response.status_code == 200 
    assert  not commit["Changes"]==1 and not commit["Message"]=="Added test instructions"
     