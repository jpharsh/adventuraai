from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("CLAUDE_API_KEY")

anthropic = Anthropic(api_key=api_key)

completion = anthropic.completions.create(
    model="claude-2",
    prompt=f"{HUMAN_PROMPT} Generate a 200 word travel itinerary that has someone visit Atlanta. They will visit 3 famous landmarks at 3 different times of day.  Also have meals at restaurants before visiting each landmark {AI_PROMPT}",
    max_tokens_to_sample=300,
    stream=True
)

for chunk in completion:
    print(chunk.completion, end="")
    if chunk.completion.endswith("..."):
        break
    if chunk.completion == "I'm sorry, I don't understand.":
        break