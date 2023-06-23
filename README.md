## Openai fine-tuning using nodejs with TypeScript

## Introduction
  We have create website using openai fine-tuning trained model with nodejs and TypeScript. With this code you can create your own dataset model. And then 
  filter/search data according own dataset.With this code you can upload your dataset file and create your own fine-tuning model.

  The OpenAI API can be applied to virtually any task that requires understanding or generating natural language and code. The OpenAI API can also be used to generate and edit images or convert speech into text. We offer a range of models with different capabilities and price points, as well as the ability to fine-tune custom models.

## Fine-tuning
Learn how to customize a model for your application.

Introduction
Fine-tuning lets you get more out of the models available through the API by providing:

Higher quality results than prompt design
Ability to train on more examples than can fit in a prompt
Token savings due to shorter prompts
Lower latency requests
GPT-3 has been pre-trained on a vast amount of text from the open internet. When given a prompt with just a few examples, it can often intuit what task you are trying to perform and generate a plausible completion. This is often called "few-shot learning."

Fine-tuning improves on few-shot learning by training on many more examples than can fit in the prompt, letting you achieve better results on a wide number of tasks. Once a model has been fine-tuned, you won't need to provide examples in the prompt anymore. This saves costs and enables lower-latency requests.

At a high level, fine-tuning involves the following steps:

Prepare and upload training data
Train a new fine-tuned model
Use your fine-tuned model
Visit our pricing page to learn more about how fine-tuned model training and usage are billed.

What models can be fine-tuned?
Fine-tuning is currently only available for the following base models: davinci, curie, babbage, and ada. These are the original models that do not have any instruction following training (like text-davinci-003 does for example). You are also able to continue fine-tuning a fine-tuned model to add additional data without having to start from scratch

## Tokens

GPT and embeddings models process text in chunks called tokens. Tokens represent commonly occurring sequences of characters. For example, the string " tokenization" is decomposed as " token" and "ization", while a short and common word like " the" is represented as a single token. Note that in a sentence, the first token of each word typically starts with a space character. Check out our tokenizer tool to test specific strings and see how they are translated into tokens. As a rough rule of thumb, 1 token is approximately 4 characters or 0.75 words for English text.

## Prepare training data

Your data must be a JSONL document, where each line is a prompt-completion pair corresponding to a training example. You can use our CLI data preparation tool to easily convert your data into this file format.

{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}
{"prompt": "<prompt text>", "completion": "<ideal generated text>"}

## Required dependencies:

Node is installed (v 16.16.0)

npm is installed (v 8.11.0)

## Prerequisites
Express

Understanding of rest api

Idea for working in backend technology.

## Create development.env to setup required environment variables

Go to the pre-start folder and env>development.env file directory

NODE_ENV=development

jwt_secret_key=""

Opeanai key=""

## Api code
   Api path - src/controllers/customer/

## Installing Dependencies
Express

Mongoose

Dotenv

Bcryptjs


## Server
PORT=3009

HOST=localhost

## Setup Steps:
### Install project dependency
`npm install`
### local server
`npm run start:dev`
### prod build
`npm run build`
### prod build run
`node dist/index.js`

