from neo4j import GraphDatabase
import json

# Neo4j connection details (change these)
URI = "bolt://localhost:7687"  # or Neo4j AuraDB URL if using cloud
USERNAME = "neo4j"
PASSWORD = "nizam2355"

# Load JSON data
with open(r"C:\Users\jasim\OneDrive\Desktop\HI\data\Washing_Machine.json", "r") as file:
    data = json.load(file)

# Function to create nodes and relationships
def create_kg(tx, model, issue, cause, solution, steps):
    query = """
    MERGE (m:Model {name: $model})
    MERGE (i:Issue {name: $issue})
    MERGE (c:Cause {description: $cause})
    MERGE (s:Solution {description: $solution})
    MERGE (st:Steps {description: $steps})
    MERGE (m)-[:HAS_ISSUE]->(i)
    MERGE (i)-[:CAUSED_BY]->(c)
    MERGE (i)-[:HAS_SOLUTION]->(s)
    MERGE (s)-[:STEPS_TO_SOLVE]->(st);
    """
    tx.run(query, model=model, issue=issue, cause=cause, solution=solution, steps=steps)

# Connect to Neo4j and upload data
driver = GraphDatabase.driver(URI, auth=(USERNAME, PASSWORD))

with driver.session() as session:
    for entry in data:
        session.write_transaction(create_kg, 
                                  entry["Device Model"], 
                                  entry["Issue"], 
                                  entry["Possible Cause"], 
                                  entry["Solution"], 
                                  entry["Steps to Follow"])

print("Knowledge Graph built successfully in Neo4j!")
