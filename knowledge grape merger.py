from neo4j import GraphDatabase
import json

# Neo4j connection details
URI = "bolt://localhost:7687"  # or Neo4j AuraDB URL if using cloud
USERNAME = "neo4j"
PASSWORD = "nizam2355"

# Connect to Neo4j
driver = GraphDatabase.driver(URI, auth=(USERNAME, PASSWORD))

# Function to create and connect the knowledge graph from each device's data
def connect_knowledge_graphs(tx, device_model, issue, cause, solution, steps):
    query = """
    // Match or create the device model node
    MERGE (dm:Model {name: $device_model})
    
    // Create or match the shared issue node
    MERGE (i:Issue {name: $issue})
    
    // Create or match the cause node
    MERGE (c:Cause {description: $cause})
    
    // Create or match the solution node
    MERGE (s:Solution {description: $solution})
    
    // Create or match the steps node
    MERGE (st:Steps {description: $steps})
    
    // Link the device model to the issue
    MERGE (dm)-[:HAS_ISSUE]->(i)
    
    // Link the issue to its cause and solution
    MERGE (i)-[:CAUSED_BY]->(c)
    MERGE (i)-[:HAS_SOLUTION]->(s)
    
    // Link the solution to the steps to solve it
    MERGE (s)-[:STEPS_TO_SOLVE]->(st)
    """
    tx.run(query, device_model=device_model, issue=issue, cause=cause, solution=solution, steps=steps)

# Function to load and process the data files for all devices
def process_device_data(driver, data_files):
    with driver.session() as session:
        for data_file in data_files:
            # Load the device data (JSON format)
            with open(data_file, "r") as file:
                data = json.load(file)
            
            for entry in data:
                # Process each entry in the data
                session.write_transaction(connect_knowledge_graphs, 
                                          entry["Device Model"], 
                                          entry["Issue"], 
                                          entry["Possible Cause"], 
                                          entry["Solution"], 
                                          entry["Steps to Follow"])

# List of JSON data files for the 14 devices
data_files = [
    r"C:\Users\jasim\OneDrive\Desktop\HI\data\android_mobiles.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\apple_laptops.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\bluetooth_airpods.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\Bluetooth_Speakers.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\Cameras (1).json", 
    r"C:\Users\jasim\OneDrive\Desktop\HI\data\Gaming_Laptops.json",r"C:\Users\jasim\OneDrive\Desktop\HI\data\iPhone_Mobiles.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\Iron_Box.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\knowledge_graph_dataset (1).json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\Laptops.json", 
    r"C:\Users\jasim\OneDrive\Desktop\HI\data\Projector.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\Refrigerator.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\Smart_Watches.json", r"C:\Users\jasim\OneDrive\Desktop\HI\data\Washing_Machine.json"
]

# Process the device data and connect the knowledge graphs
process_device_data(driver, data_files)

print("All knowledge graphs connected successfully!")
