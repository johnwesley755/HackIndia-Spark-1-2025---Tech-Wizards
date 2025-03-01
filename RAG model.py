import google.generativeai as genai
import os
from dotenv import load_dotenv
from neo4j import GraphDatabase

# Load environment variables from .env file
load_dotenv()

# Neo4j connection details
URI = "bolt://localhost:7687"  # Update if using Neo4j AuraDB
USERNAME = "neo4j"
PASSWORD = "nizam2355"

# Connect to Neo4j
driver = GraphDatabase.driver(URI, auth=(USERNAME, PASSWORD))

# Gemini API Key (Ensure this is set in your .env file)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("⚠️ Gemini API Key is missing! Set it in the .env file.")

# Initialize Google Gemini API
genai.configure(api_key=GEMINI_API_KEY)

# Function to query Neo4j for relevant information
def get_relevant_info(tx, device_model, issue):
    query = """
    MATCH (dm:Model {name: $device_model})-[:HAS_ISSUE]->(i:Issue {name: $issue})
    OPTIONAL MATCH (i)-[:CAUSED_BY]->(c:Cause)
    OPTIONAL MATCH (i)-[:HAS_SOLUTION]->(s:Solution)
    OPTIONAL MATCH (s)-[:STEPS_TO_SOLVE]->(st:Steps)
    RETURN dm.name AS device, i.name AS issue, 
           COALESCE(c.description, "Not Available") AS cause, 
           COALESCE(s.description, "Not Available") AS solution, 
           COALESCE(st.description, "Not Available") AS steps
    """
    result = tx.run(query, device_model=device_model, issue=issue).single()
    return result if result else None

# Function to generate an answer using Google Gemini API
def generate_answer_with_gemini(question, relevant_info):
    if not relevant_info:
        return "Sorry, I couldn't find relevant information. Please check the device model and issue."
    
    # Constructing context from Neo4j data
    context = f"Device: {relevant_info['device']}\nIssue: {relevant_info['issue']}\n"
    if relevant_info['cause'] != "Not Available":
        context += f"Possible Cause: {relevant_info['cause']}\n"
    if relevant_info['solution'] != "Not Available":
        context += f"Solution: {relevant_info['solution']}\n"
    if relevant_info['steps'] != "Not Available":
        context += f"Steps to Solve: {relevant_info['steps']}\n"
    
    prompt = f"User question: {question}\n\nContext: {context}\n\nProvide a helpful troubleshooting answer."

    # Generate response from Gemini
    model = genai.GenerativeModel("gemini-1.5-pro-latest")
    response = model.generate_content(prompt)

    return response.text

# Function to answer user queries
def answer_query(device_model, issue, question):
    with driver.session() as session:
        relevant_info = session.execute_read(get_relevant_info, device_model, issue)
        return generate_answer_with_gemini(question, relevant_info)

# Example usage
if __name__ == "__main__":
    device_model = "Bluetooth Speakers"  # Ensure this exists in Neo4j
    issue = "Not pairing"  # Ensure this exists in Neo4j
    user_query = "Why is my Bluetooth speaker not pairing?"
    answer = answer_query(device_model, issue, user_query)
    print("\n🔧 AI Response:\n", answer)

