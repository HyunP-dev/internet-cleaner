from transformers import TextClassificationPipeline, BertForSequenceClassification, AutoTokenizer
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

model_name = 'smilegate-ai/kor_unsmile'
model = BertForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)
pipe = TextClassificationPipeline(
    model=model,
    tokenizer=tokenizer,
    device=0,  # cpu: -1, gpu: gpu number
    return_all_scores=True,
    function_to_apply='sigmoid'
)


class Sentence(BaseModel):
    sentence: str


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://everytime.kr",
    "https://everytime.kr"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/check/")
async def check(sentence: Sentence):
    return pipe(sentence.sentence)[0][-1]["score"] > 0.7
