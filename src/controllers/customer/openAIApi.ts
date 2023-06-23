import request from 'request';
import CircularJSON from 'circular-json';
import { Configuration, OpenAIApi } from 'openai';
import { rejects } from 'assert';
import fs from 'fs';
import FormData from 'form-data';
import path  from 'path';
const coolPath = path.join(__dirname, 'ruby.jsonl');
const configuration = new Configuration({
    apiKey: process.env.key
});
const openai = new OpenAIApi(configuration);

// Get response by user role
function resByUserRole(data:any):Promise<any>{
    return new Promise((resolve,reject)=>{
        try{
            var content:any = data.content ? data.content : 'Say I am punit sharma';    
            var obj = {        
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "user", "content": content}],
                "temperature": 0.7        
            }
            request({
                url: "https://api.openai.com/v1/chat/completions",
                method: "POST",
                json: true,   // <--Very important!!!
                headers:{
                    'content-type':'application/json',
                    'Authorization':'Bearer Your Authorization Token'
                },
                body: obj
            }, function (error, response, body){
                if(error){
                    reject(error);
                }
                resolve(response.body);
            });
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
};

// Get response by assistant role
function resByAssistantRole(data:any):Promise<any>{
    return new Promise((resolve,reject)=>{
        try{
            var content:any = data.content ? data.content : 'Say I am punit sharma';
            var obj = {        
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "assistant", "content": content}],
                "temperature": 0.7        
            }
            request({
                url: "https://api.openai.com/v1/chat/completions",
                method: "POST",
                json: true,   // <--Very important!!!
                headers:{
                    'content-type':'application/json',
                    'Authorization':'Bearer Your Authorization Token'
                },
                body: obj
            }, function (error, response, body){
                if(error){
                    reject(error);
                }
                resolve(response.body);
            });
        }catch(err){
            console.log(err);
        }
    });
};

// Get response by system role
function resBySystemRole(data:any):Promise<any>{
    return new Promise((resolve,reject)=>{
        try{
            var content:any = data.content ? data.content : 'Say I am punit sharma';
            var obj = {        
                "model": "gpt-3.5-turbo",
                "messages": [{"role": "system", "content": content}],
                "temperature": 0.7        
            }
            request({
                url: "https://api.openai.com/v1/chat/completions",
                method: "POST",
                json: true,   // <--Very important!!!
                headers:{
                    'content-type':'application/json',
                    'Authorization':'Bearer Your Authorization Token'
                },
                body: obj
            }, function (error, response, body){
                if(error){
                    reject(error);
                }
                resolve(response.body);
            });
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
};

// Get all models
function getAllModel():Promise<any>{
    return new Promise(async (resolve,reject)=>{
        try{
            const response:any = await openai.listModels();
            const str:any = CircularJSON.stringify(response);
            const str1:any = JSON.parse(str);
            resolve(str1.data);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}

// Upload file
function UploaddataFile():Promise<any>{
    return new Promise(async(resolve,reject)=>{
        try{
            const stream:any = fs.createReadStream(coolPath);
            const response:any = await openai.createFile(stream, "fine-tune");
            console.log('response---------',response.data);
            resolve(response.data);
            // response data
            // {
            //     object: 'file',
            //     id: 'file-eeF4olgqRhBGeYTqPEyh8335',
            //     purpose: 'fine-tune',
            //     filename: 'jsonviewer_prepared.jsonl',
            //     bytes: 126,
            //     created_at: 1684230204,
            //     status: 'uploaded',
            //     status_details: null
            //   }              
        }catch(err){
            console.log('error --- ',err);
            reject(err);
        }
    });
}

// Create file tune
function CreateFineTune():Promise<any>{
    return new Promise(async(resolve,reject)=>{
        try{
            //8Tdzgg90bYOIIFrNhgSzitOm
            const response = await openai.createFineTune({
                training_file: "Your file Id",
                model:"ada",//"ada",//"babbage"
            });
            console.log(response.data);
            resolve(response.data);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}

// Fine-tune list(Models)
function getFineTuneList():Promise<any>{
    return new Promise(async(resolve,reject)=>{
        try{
            const response = await openai.listFineTunes();
            resolve(response.data);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}

// Create completions
function createCompletions(data:any):Promise<any>{
    return new Promise(async(resolve,reject)=>{
        try{
            const content:any = data.message;            
            var obj = {
                "prompt":'Course Name: '+data.message+'\n###\n',
                "model":"Your fine-tuning trained model id",
                "max_tokens":1,
                "temperature":0.1,
                "n":1,
                "stop": '\n',
            };
            console.log(obj);
            const response:any = await openai.createCompletion(obj);              
            resolve(response.data.choices[0].text);
        }catch(err){
            console.log(err);
            reject(err);
        }
    });
}

// Export default
export default {
    resByUserRole,
    resByAssistantRole,
    resBySystemRole,
    getAllModel,
    UploaddataFile,
    CreateFineTune,
    createCompletions,
    getFineTuneList
} as const