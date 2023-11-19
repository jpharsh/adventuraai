from transformers import T5Tokenizer, T5ForConditionalGeneration

tokenizer = T5Tokenizer.from_pretrained("google/flan-t5-base")
model = T5ForConditionalGeneration.from_pretrained("google/flan-t5-base")

# More detailed prompt with specific instructions and context
input_text = (
   ''' "Generate a 200-word day-trip itinerary for Atlanta. Start with an introduction about Atlanta. "
    "Then, list three famous landmarks to visit in the morning, such as [landmark 1], [landmark 2], and [landmark 3]. "
    "Provide a brief description of each landmark. After that, recommend two local restaurants for lunch: [restaurant 1] and [restaurant 2]. "
    "Include suggested dishes and their specialties. In the afternoon, suggest two activities or attractions to explore: [activity 1] and [activity 2]. "
    "Conclude the itinerary with a final landmark visit or a relaxing spot. Ensure detailed descriptions for each stop." '''
    "We have 3 landmarks to visit in Atlanta. Put them as a list."
)

input_ids = tokenizer.encode(input_text, return_tensors="pt")
outputs = model.generate(input_ids, min_length=20, max_length=50, num_return_sequences=1, temperature=0.7)

generated_text = tokenizer.decode(outputs[0])
print(generated_text)
