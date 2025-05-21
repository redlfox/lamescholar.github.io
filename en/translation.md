---
comments: true
title: Translation
---

[ChatGPT](/ru/chatgpt), in addition to the much more known ability to compose plausible texts, has, in my opinion, a much more significant ability - ability to translate. Unlike Google Translate or Yandex Translate, ChatGPT translation is much more stable. However, ChatGPT itself has a number of disadvantages:

1) Limit on the input size and number of messages.

2) Not available in some regions.

3) Today or tomorrow, OpenAI can make access paid.

Because of these disadvantages, a local, open source alternative to ChatGPT is needed. And it exists. How does it work? You insert the text into a text file. You run the script. The script translates text in chunks of 3 sentences. The script immediately displays each chunk on the screen as soon as it has translated it. The translation is gradually assembled in the command line. You can read what the script has already translated. At the end, the translation is saved in a text file.

About the script. The script splits the text into paragraphs, and paragraphs into sentences. Each paragraph is split into chunks of 3 sentences, which are fed to the qwen3:4b model. I install it via Ollama.

3 sentences is optimal size. Too large a chunk may overload the model, break the translation. One sentence at a time - no context.
<br><br>

Once you have a translation, you can have the model to review the translation. Again in chunks. The second script goes through the parallel chunks in text.txt and translation.txt files and makes the following request:

```
Text: chunk of text
Translation: chunk of translation
Review the translation. Improve it if necessary.
Return only final English translation.
```

Unlike [this service](https://www.booktranslate.ai/), you can run review as many times as you want. And for free.
<br><br>

Before running the scripts, you need to have these **prerequisites**:

**Ollama** - <https://ollama.com/>

Download, then install **qwen3:4b** model:

```
ollama run qwen3:4b
```

**Python** - <https://www.python.org/downloads/>

Download, then install **nltk package** (to break down paragraphs into sentences):

```
pip install nltk
```
<br>

Now the scripts. I recommend you create a folder and hold all files in it.

**First script:**

```
import nltk
from nltk.tokenize import sent_tokenize
import subprocess
import re
import textwrap

# Download punkt tokenizer if not already present
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# Config
input_file = 'text.txt'
output_file = 'translation.txt'

# Read and split text into paragraphs
with open(input_file, 'r', encoding='utf-8') as f:
    raw_text = f.read()

# Split paragraphs
paragraphs = [p.strip() for p in raw_text.split('\n\n') if p.strip()]

# Function to split paragraph into sentences
def split_into_sentences(text):
    return sent_tokenize(text)

# Generate batching rule
def generate_batching_rule(n):
    if n < 1:
        return []
    if n == 1:
        return [1]
    threes = n // 3
    remainder = n % 3
    if remainder == 0:
        return [3] * threes
    elif remainder == 1:
        if threes >= 1:
            return [3] * (threes - 1) + [2, 2]
        else:
            return [2, 2]
    elif remainder == 2:
        return [3] * threes + [2]

# Split paragraphs into sentence batches
def create_batches(paragraphs):
    batches = []
    paragraph_batch_counts = []
    for p_idx, paragraph in enumerate(paragraphs):
        sentences = split_into_sentences(paragraph)
        n = len(sentences)
        if n == 0:
            paragraph_batch_counts.append(0)
            continue
        rule = generate_batching_rule(n)
        pointer = 0
        batch_count = 0
        for size in rule:
            batch = " ".join(sentences[pointer:pointer + size])
            batches.append((p_idx, batch))
            pointer += size
            batch_count += 1
        paragraph_batch_counts.append(batch_count)
    return batches, paragraph_batch_counts

# Prepare batches
batches, paragraph_batch_counts = create_batches(paragraphs)
translated_paragraphs = [[] for _ in paragraphs]
batches_processed_per_paragraph = [0] * len(paragraphs)

print(f"🔄 Translating {len(batches)} batches...\n")

# For streaming-aware wrapping
max_width = 80
line_length_by_paragraph = {}

# Process each batch
for (p_idx, batch) in batches:
    prompt = f"Return only translation. Translate to English: {batch}"

    try:
        result = subprocess.run(
            ['ollama', 'run', 'qwen3:4b', '/no_think'],
            input=prompt,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            encoding='utf-8',
        )

        if result.returncode != 0:
            print(f"\n[ERROR] Batch failed:\nPrompt: {prompt}\nError: {result.stderr.strip()}")
            translated = '[TRANSLATION ERROR]'
        else:
            translated = re.sub(r'</?think>', '', result.stdout).strip()

    except Exception as e:
        print(f"\n[EXCEPTION] Batch failed:\nPrompt: {prompt}\nException: {str(e)}")
        translated = '[TRANSLATION ERROR]'

    translated_paragraphs[p_idx].append(translated)
    batches_processed_per_paragraph[p_idx] += 1

    current_length = line_length_by_paragraph.get(p_idx, 0)
    words = translated.split()

    for word in words:
        if current_length + len(word) + 1 > max_width:
            print()
            print(word, end=' ', flush=True)
            current_length = len(word) + 1
        else:
            print(word, end=' ', flush=True)
            current_length += len(word) + 1

    line_length_by_paragraph[p_idx] = current_length

    if batches_processed_per_paragraph[p_idx] == paragraph_batch_counts[p_idx]:
        print('\n')
        line_length_by_paragraph[p_idx] = 0

# Write final translation to output file
with open(output_file, 'w', encoding='utf-8') as out:
    for paragraph_batches in translated_paragraphs:
        out.write(' '.join(paragraph_batches).strip() + '\n\n')

print("✅ Translation complete.")
```

I called it qwen3-visual.py, since it displays translated chunks in command line.
<br><br>

**Second script:**

```
import nltk
from nltk.tokenize import sent_tokenize
import subprocess
import re

# Download punkt tokenizer if not already present
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# Config
input_file = 'text.txt'
initial_translation_file = 'translation.txt'
output_file = 'translation_new.txt'

# Read original and translated texts
with open(input_file, 'r', encoding='utf-8') as f:
    source_text = f.read()

with open(initial_translation_file, 'r', encoding='utf-8') as f:
    translated_text = f.read()

# Split into paragraphs
source_paragraphs = [p.strip() for p in source_text.split('\n\n') if p.strip()]
translated_paragraphs = [p.strip() for p in translated_text.split('\n\n') if p.strip()]

# Sanity check
if len(source_paragraphs) != len(translated_paragraphs):
    raise ValueError("Mismatch in paragraph count between source and translated text.")

# Sentence tokenizer
def split_into_sentences(text):
    return sent_tokenize(text)

# Batching rule (same as original)
def generate_batching_rule(n):
    if n < 1:
        return []
    if n == 1:
        return [1]
    threes = n // 3
    remainder = n % 3
    if remainder == 0:
        return [3] * threes
    elif remainder == 1:
        if threes >= 1:
            return [3] * (threes - 1) + [2, 2]
        else:
            return [2, 2]
    elif remainder == 2:
        return [3] * threes + [2]

# Create batches with paragraph indexing, same as original script
def create_batches(paragraphs):
    batches = []
    paragraph_batch_counts = []
    for p_idx, paragraph in enumerate(paragraphs):
        sentences = split_into_sentences(paragraph)
        n = len(sentences)
        if n == 0:
            paragraph_batch_counts.append(0)
            continue
        rule = generate_batching_rule(n)
        pointer = 0
        batch_count = 0
        for size in rule:
            batch = " ".join(sentences[pointer:pointer + size])
            batches.append((p_idx, batch))
            pointer += size
            batch_count += 1
        paragraph_batch_counts.append(batch_count)
    return batches, paragraph_batch_counts

# Prepare batches from both source and translation
source_batches, source_batch_counts = create_batches(source_paragraphs)
translated_batches, translated_batch_counts = create_batches(translated_paragraphs)

if source_batch_counts != translated_batch_counts:
    raise ValueError("Mismatch in batch counts between source and translated text.")

print(f"🔍 Reviewing {len(source_batches)} batches...\n")

# Variables to track printing length per paragraph (for wrapping)
max_width = 80
line_length_by_paragraph = {}
batches_processed_per_paragraph = [0] * len(source_paragraphs)

reviewed_batches = [[] for _ in source_paragraphs]

for (p_idx, src_batch), (_, trans_batch) in zip(source_batches, translated_batches):
    prompt = f"Text: {src_batch}\nTranslation: {trans_batch}\nReview the translation. Improve it if necessary.\nReturn only final English translation."

    try:
        result = subprocess.run(
            ['ollama', 'run', 'qwen3:4b', '/no_think'],
            input=prompt,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            encoding='utf-8',
        )

        if result.returncode != 0:
            print(f"\n[ERROR] Batch failed:\nPrompt: {prompt}\nError: {result.stderr.strip()}")
            improved = '[REVIEW ERROR]'
        else:
            improved = re.sub(r'</?think>', '', result.stdout).strip()

    except Exception as e:
        print(f"\n[EXCEPTION] Batch failed:\nPrompt: {prompt}\nException: {str(e)}")
        improved = '[REVIEW ERROR]'

    # Append improved batch to corresponding paragraph
    reviewed_batches[p_idx].append(improved)
    batches_processed_per_paragraph[p_idx] += 1

    # Wrapped printing (exactly your original illustration adapted)
    current_length = line_length_by_paragraph.get(p_idx, 0)
    words = improved.split()

    for word in words:
        if current_length + len(word) + 1 > max_width:
            print()
            print(word, end=' ', flush=True)
            current_length = len(word) + 1
        else:
            print(word, end=' ', flush=True)
            current_length += len(word) + 1

    line_length_by_paragraph[p_idx] = current_length

    # After last batch of paragraph, print a newline and reset length counter
    if batches_processed_per_paragraph[p_idx] == source_batch_counts[p_idx]:
        print('\n')
        line_length_by_paragraph[p_idx] = 0

# Combine improved batches back into paragraphs
final_paragraphs = [' '.join(batches).strip() for batches in reviewed_batches]

# Write improved translation to file
with open(output_file, 'w', encoding='utf-8') as out:
    for para in final_paragraphs:
        out.write(para + '\n\n')

print("✅ Translation review complete.")
```

I called it qwen3-visual-review.py
<br><br>

OK, you have in your folder:<br>
text.txt<br>
qwen3-visual.py<br>
qwen3-visual-review.py

To easily run your scripts, create 2 .bat files.

qwen3-visual.bat:

```
python qwen3-visual.py
pause
```

qwen3-visual-review.bat:

```
python qwen3-visua-review.py
pause
```