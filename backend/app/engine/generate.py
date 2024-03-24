import logging
import time
from dotenv import load_dotenv

from app.engine.constants import DATA_DIR, STORAGE_DIR
from app.engine.context import create_service_context

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
    logger.info(f"Finished creating new index. Stored in {STORAGE_DIR}")

if __name__ == "__main__":
    service_context = create_service_context()
    generate_datasource(service_context)
