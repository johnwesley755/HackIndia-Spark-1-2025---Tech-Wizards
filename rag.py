import os
import json
import faiss
import numpy as np
from docx import Document
from sentence_transformers import SentenceTransformer


FOLDER_PATH = r"D:\Rag\HackIndia"  
OUTPUT_JSON = "combined_booklet.json"
FAISS_INDEX_PATH = "combined_faiss.index"


model = SentenceTransformer("all-MiniLM-L6-v2")

def load_booklet(file_path):
    """Extracts sections from a DOCX file."""
    doc = Document(file_path)
    sections = []
    current_section = {"title": "Introduction", "content": "", "source": os.path.basename(file_path)}

    for para in doc.paragraphs:
        text = para.text.strip()
        if text:
            if len(text) < 40 and ":" not in text:  
                if current_section["content"]:
                    sections.append(current_section)
                current_section = {"title": text, "content": "", "source": os.path.basename(file_path)}
            else:
                current_section["content"] += text + " "

    if current_section["content"]:
        sections.append(current_section)

    return sections

all_sections = []
doc_files = [f for f in os.listdir(FOLDER_PATH) if f.endswith(".docx")]
for file in doc_files:
    file_path = os.path.join(FOLDER_PATH, file)
    sections = load_booklet(file_path)
    all_sections.extend(sections)


with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
    json.dump(all_sections, f, indent=4)

print(f"✅ Extracted {len(all_sections)} sections from {len(doc_files)} documents.")

if all_sections:
    texts = [section["content"] for section in all_sections]
    embeddings = model.encode(texts, convert_to_numpy=True)

    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(embeddings)


    faiss.write_index(index, FAISS_INDEX_PATH)
    print("✅ FAISS index created successfully!")

def retrieve_relevant_section(query, top_k=3):
    """Retrieves the most relevant section for a given query."""
    query_embedding = model.encode([query])
    index = faiss.read_index(FAISS_INDEX_PATH)
    distances, nearest_idx = index.search(query_embedding, k=top_k)

    results = []
    for idx in nearest_idx[0]:
        if idx >= 0:
            results.append(all_sections[idx])

    return results if results else ["No relevant information found."]


if __name__ == "__main__":
    query = input("🔍 Enter your search query: ")
    retrieved_info = retrieve_relevant_section(query)

    print("\n📌 Retrieved Information:")
    for info in retrieved_info:
        print(f"\n🔹 Title: {info['title']}\n📄 Source: {info['source']}\nContent: {info['content'][:300]}...")
