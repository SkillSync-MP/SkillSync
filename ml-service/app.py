from fastapi import FastAPI
from pydantic import BaseModel
from model import SkillSyncModel

app = FastAPI()
model = SkillSyncModel("dummy.csv")  # not used now

class SearchRequest(BaseModel):
    query: str
    users: list

@app.post("/search")
def search_users(req: SearchRequest):
    results = model.search(req.query, req.users)
    return {"results": results}








        # GIVING RESULTS FROM CSV DATA 
# from fastapi import FastAPI
# from pydantic import BaseModel
# from model import SkillSyncModel

# app = FastAPI()

# # Load model once
# model = SkillSyncModel("data.csv")  # rename your CSV here

# class SearchRequest(BaseModel):
#     query: str

# @app.post("/search")
# def search_users(req: SearchRequest):
#     results = model.search(req.query)
#     return {"results": results}