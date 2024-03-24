# Harry Potter and the Order of the Arize Phoenix

## Table of contents
- What we will do
- What you will need
- Getting Started
  - Step 1: Get your OpenAI API Key
  - Step 2: Find Source Material (Harry Potter Books)
  - Step 3: Create Embeddings
    - OpenAI API and Embeddings
    - LlamaIndex and Vector Index Creation
  - Step 4: Docker Compose
  - Step 5: Updating the Frontend
  - Step 6: Hosting
  - Step 7: Order Of Arize Phoenix Overview
  - Step 8: Arize Phoenix Review

### What we will do
Create a Full stack app that allows you to chat with the entire 7 Harry Potter Books.

### What you will need
- Create an api account with OpenAI
- Create an account with Microsoft Azure
- Docker
- All your usual coding tools

### Getting Started
Open your terminal and execute the below command:

    bash
    git clone https://github.com/Arize-ai/openinference

The example we are going to focus on is the llama-index example:

    bash
    cd openinference/python/examples/llama-index

#### Step 1: Get your OpenAI API Key
Go to the OpenAI API Key Generation and create your OpenAI key.

#### Step 2: Find Source Material (Harry Potter Books)
First, let's start by creating the embeddings. Embeddings are dense vector representations of text that capture the semantic meaning and context of the words. They allow the language model to understand and retrieve relevant information based on similarity.

Go to the data directory and upload the PDF files that we want our chatbot to be able to retrieve information from. In this example, we are going to use the entire collection of Harry Potter books.

    bash
    cd backend/app/data

Once you have replaced the 101.pdf file with your source material, navigate back to the backend folder:

    bash
    cd ..
    cd ..

You should be in your backend folder now. Create a new .env file and paste your OPENAI_API_KEY in the .env file.

#### Step 3: Create Embeddings
Now we are going to create embeddings.

    bash
    pip install Poetry
    poetry shell
    poetry install
    poetry lock
    python app/engine/generate.py

Note: OpenAI rate limits embeddings on large amounts of data. If this applies to you, update your generate_datasource function as follows. This function is found in generate.py. This process can take a while as we wait three seconds between embedding batches to avoid hitting the rate limit. This is generally the case if you want to embed a book or multiple books.

    python
    import logging
    import time
    from dotenv import load_dotenv

    from app.engine.constants import DATA_DIR, STORAGE_DIR
    from app.engine.context create_service_context

    load_dotenv()

    from llama_index import (
        SimpleDirectoryReader,
        VectorStoreIndex,
    )

    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger()

    def generate_datasource(service_context):
        logger.info("Creating new index")
        # load the documents
        documents = SimpleDirectoryReader(DATA_DIR).load_data()

        # Initialize the index outside the loop
        index = VectorStoreIndex([], service_context=service_context)
        for i in range(0, len(documents), 10):
            batch_docs = documents[i:i+10]
            # Use insert_nodes to add documents to the existing index
            index.insert_nodes(batch_docs)
            time.sleep(3)  # Add a delay of 3 seconds between each batch

        # store it for later
        index.storage_context.persist(STORAGE_DIR)
        logger.info("Finished creating new index. Stored in {STORAGE_DIR}")

    if __name__ == "__main__":
        service_context = create_service_context()
        generate_datasource(service_context)

#### Step 4: Docker Compose
Everyone's local environments are different, so instead of troubleshooting, let's leverage the Docker Compose to deploy the frontend, backend, and Arize Phoenix public Docker Image.

    bash
    cd ..
    pip install docker-compose  
    docker-compose down
    docker-compose up -d

You should see the application running at localhost:3000. Chat with your website and ensure that everything works, and that you are getting responses according to your source material. You can do this using the Phoenix UI and taking a deep dive into each of your individual requests.

Below you see the Phoenix UI at localhost:6006. We'll look at this more in-depth once we get this hosted and change the frontend.

#### Step 5: Updating the Frontend
Now that we confirmed everything works, let's update the frontend so it matches your source material. You will need beginner-level knowledge of Next.js and TypeScript.

To do this, you can edit the following files:

- frontend/app/page.tsx
- frontend/app/components/chat-section.tsx
- frontend/app/components/header.tsx
- frontend/app/components/ui/chat/chat-avatar.tsx
- frontend/app/components/ui/chat/chat-input.tsx
- frontend/app/components/ui/chat/chat-messages.tsx
- frontend/app/public (This is where your assets go)

#### Step 6: Hosting
Docker Compose makes incredibly complicated hosting so easy. For this project, we'll host using Azure.

- Create an Azure account
- Create an Azure VM Instance
- Choose Ubuntu 22.04 as the image
- Example: Standard_b2ms
cd into your folder that includes your ssh certificate and follow the steps below:

    bash
    chmod 400 "Phoenix.pem"
    scp -i "Phoenix.pem" Phoenix/openinference/python/examples/llama-index.zip  ubuntu@serverURL:~/
    ssh -i "Phoenix.pem" ubuntu@serverURL
    sudo apt update
    sudo apt install unzip
    unzip llama-index.zip
    cd llama-index
    sudo apt install docker-compose
    docker-compose --version  
    nano ~/.bashrc
    export OPENAI_API_KEY="your_api_key_here"
    sudo docker-compose -f compose.yml up -d
    sudo docker-compose -f compose.yml ps

Note: If you run into any issues, directly add the OPENAI API KEY into the backend Dockerfile and the Docker Compose File. Ensure you change the localhost in your frontend/Dockerfile and your compose.yml with your Public IP Address.

For the purposes of getting everything to work, go to the network settings and allow any to the ports we are running (8000, 3000, 6006).

Warning: Be sure to lock these down after if you want to leave this in production!

Everyone can now access your new Harry Potter app at http://<ip-address>:3000.

#### Step 7: Order Of Arize Phoenix Overview
Test out what you built by going to url:3000.

#### Step 8: Arize Phoenix Review
Go to url:6006.

Here you can see all the magic that happens behind the scenes with Phoenix.

Arize Phoenix is an innovative AI platform designed to empower businesses with advanced machine learning capabilities. It provides a user-friendly interface that allows users to easily create, train, and deploy AI models without requiring deep technical expertise. Phoenix leverages state-of-the-art algorithms and powerful computing resources to deliver accurate and efficient AI solutions. With its scalable architecture and seamless integration options, Arize Phoenix enables organizations to harness the power of AI to drive insights, automate processes, and make data-driven decisions.

**Dashboard:** Here you can see high-level details of all the requests that are being made, like time, latency, tokens used, etc.

**Trace Details:** Walk through all the steps that are involved in the process of getting your response.

You can dive deeper into seeing the behavior on context the LLM goes through when asked - "Who is Harry Potter?".

And that concludes our journey into the world of Arize Phoenix. Like the Order of the Phoenix, this platform is leading the charge in the fight against the dark arts of complex AI development. Mischief managed!





