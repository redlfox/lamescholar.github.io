---
title: Translation
---

[ChatGPT](/ru/chatgpt), in addition to the much more known possibility of composing plausible texts, has, in my opinion, a much more significant possibility - the possibility of translation. Unlike Google Translate or Yandex Translate, ChatGPT translation is much more stable and holistic. However, ChatGPT itself has a number of disadvantages:

1) ChatGPT has a limit on the input size. The text should be inserted into the ChatGPT in parts.

2) To use ChatGPT in Russia, you need to create a fake phone for registration and enable VPN when using.

3) Today or tomorrow, OpenAI can make paid access.

Because of these disadvantages, an open source analogue of ChatGPT is needed. And it exists. How does it work on the surface? You insert the text of the article into a text file. Format it with macros. Run the script. In the case of an average article, wait 20 minutes. And you get a text file with a translation of the entire article.

On the [Hugging Face](https://huggingface.co/tasks/translation) platform it is possible to find open source language models - neural networks that have been trained on large volumes of parallel translation. For each pair of languages - a separate model trained on its database of parallel translations. These models can be used offline. To do this, you need to download the weights of the model. There is a good model for en-ru, ru-en, en-de, de-en pairs - [wmt19](https://huggingface.co/facebook/wmt19-de-en). For all other languages, you must use [opus-mt](https://huggingface.co/Helsinki-NLP/opus-mt-fr-en).

Translation made using scripts in [Python](https://www.python.org/downloads/). When installing, you need to tick the option Add option python.exe to PATH. After downloading, you need to install the necessary packages:

Win+R cmd

pip install transformers[torch] sentencepiece sacremoses colorama
<br><br>

Script for downloading weights:

```
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model_name = "facebook/wmt19-de-en"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

tokenizer.save_pretrained('./wmt19-de-en')
model.save_pretrained('./wmt19-de-en')
```

Create a model_download.py file and put this code in it. Then go to the command line.

Win+R cmd

```
cd path to folder, where weights will be saved
python model_download.py
```

wmt19-de-en folder will appear soon. We have weights. Now let's create a script that will use these weights for translation.

Script for translation:

```
import time
from colorama import Fore, init
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

init()

model = './wmt19-de-en'

tokenizer = AutoTokenizer.from_pretrained(model)
model = AutoModelForSeq2SeqLM.from_pretrained(model)

time_start = time.monotonic()

with open('text.txt', encoding="utf-8") as txt:
    lines = txt.readlines()

def translate_line(line: str) -> str:
    inputs = tokenizer(line, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=100)
    out_text = tokenizer.batch_decode(output, skip_special_tokens=True)
    return out_text[0]
	
print("\nTranslation...")

translation = []

for line in lines:
    if line == "\n":
        translation.append("\n\n")
    else:
        translation.append(f'{translate_line(line)}')

with open("translation.txt", "w", encoding="utf-8") as txt:
    for i in range(len(translation)-1):
        if translation[i + 1] == "\n\n":
            txt.write(translation[i])
        elif translation[i] == "\n\n":
            txt.write(translation[i])
        else:
            txt.write(translation[i]+" ")
    txt.write(translation[-1])
    
print(f"\n{Fore.GREEN}Translation completed")
print(f'{Fore.CYAN}Elapsed time {Fore.RESET}| '
     f'{(int(time.monotonic() - time_start) // 3600) % 24:d} ч. '
     f'{(int(time.monotonic() - time_start) // 60) % 60:02d} м. '
     f'{int(time.monotonic() - time_start) % 60:02d} с.\n')
```

Create a translate.py file and put this code in it.
<br><br>

So, we have weights and a script for translation. Only text is missing.

What is this formatting with macros mentioned earlier? Models from the Hugging Face site have a limit on the input length. Accordingly, the model needs to get separate sentences. To do this, the text must be formatted in such a way that each line contains one sentence (you cannot entrust the breakdown of the text into sentences to the script, because the dot and space are not only at the end of the sentence, these cases must be corrected by hand). A paragraph is an empty line.
<br><br>

Formatting is automatic - you need to record the replacement macro once in the [Notepad++](https://notepad-plus-plus.org/downloads/) program.

Notepad++ settings:

Settings->Preferences...->Backup->Remember current session for next launch. Uncheck. This setting is needed so that when opening text files, previously opened text files do not dangle.
<br><br>

Let's start creating macros. Create a text file text.txt. Let's say you want to translate text from a PDF with a text layer. Paste it into text.txt. In this case, your text will look like this:

```
Vor mehr als zehntausend Jahren lebten in Nordamerika,
in den Gebieten der heutigen Staaten Arizona, Neu­
Mexiko, Texas, Colorado zahlreiche Jägergruppen, die
nach einer Fundstätte ihrer Speerspitzen Folsomjäger
genannt werden. Woher sie kamen und wie sie lebten,
erzählt diese Geschichte.
Der Schneesturm
Nordwind tobt um kahle Tafelberge. Graugelb und rötlich
heben sie sich gegen eine fast schwarze Wolkenwand
ab, die der Sturm heranpeitscht Heulend wie eine Hyäne
zwängt er sich in die Schlucht Felsen, steil und ausge­
höhlt, begrenzen sie. Auf ihrem Grund strudelt über
Steine und entwurzelte Bäume hinweg ein Fluß.
```

In such a way [Sumatra PDF](https://www.sumatrapdfreader.org/download-free-pdf-viewer) copies the text layer from PDF files. In this case, it is necessary to mark paragraphs with empty lines:

```
Vor mehr als zehntausend Jahren lebten in Nordamerika,
in den Gebieten der heutigen Staaten Arizona, Neu­
Mexiko, Texas, Colorado zahlreiche Jägergruppen, die
nach einer Fundstätte ihrer Speerspitzen Folsomjäger
genannt werden. Woher sie kamen und wie sie lebten,
erzählt diese Geschichte.

Der Schneesturm

Nordwind tobt um kahle Tafelberge. Graugelb und rötlich
heben sie sich gegen eine fast schwarze Wolkenwand
ab, die der Sturm heranpeitscht Heulend wie eine Hyäne
zwängt er sich in die Schlucht Felsen, steil und ausge­
höhlt, begrenzen sie. Auf ihrem Grund strudelt über
Steine und entwurzelte Bäume hinweg ein Fluß.
```

Now that the paragraphs are marked, we can start recording the macro.

Macro->Start Recording.

With the help of substitutions, we'll format this text in the appropriate way.

Ctrl+H

Search mode Extended

In Notepad++, the line break symbol has the notation \r\n. We make the following replacement:

Find what:\r\n

Replace with:space (instead of the word, type the symbol)

Replace All

In the case of lines, the line break is replaced by a space. In the case of a paragraph, you will get two spaces (because an empty line means two line breaks). We will use this in the next replacement:

Find what:2 spaces

Replace with:\r\n\r\n

Two spaces were replaced by two line breaks. Paragraphs are marked again, only now the division into lines has been eliminated. Next, we will distribute each sentence in a separate line. To do this, you need to make 3 substitutions:

Find what:.space

Replace with:.\r\n

Find what:?space

Replace with:.\r\n

Find what:!space

Replace with:.\r\n

Stop Recording. Save Currently Recorded Macro... You can call it PDF.

Now all these substitutions do not need to be executed manually, but you just need to run the PDF macro.

Now text look like this:

```
Vor mehr als zehntausend Jahren lebten in Nordamerika, in den Gebieten der heutigen Staaten Arizona, Neu- Mexiko, Texas, Colorado zahlreiche Jägergruppen, die nach einer Fundstätte ihrer Speerspitzen Folsomjäger genannt werden.
Woher sie kamen und wie sie lebten, erzählt diese Geschichte.

Der Schneesturm

Nordwind tobt um kahle Tafelberge.
Graugelb und rötlich heben sie sich gegen eine fast schwarze Wolkenwand ab, die der Sturm heranpeitscht Heulend wie eine Hyäne zwängt er sich in die Schlucht Felsen, steil und ausge- höhlt, begrenzen sie.
Auf ihrem Grund strudelt über Steine und entwurzelte Bäume hinweg ein Fluß.
```

Words Neu- Mexiko and ausge- höhlt are broken. Texts with hyphens will look like this after using the macro. In such cases you need to manually replace the hyphen and space with nothing. No Replace All - you will erase the hyphen in word Neu-Mexiko.

There are texts of the second type. Without dividing into lines and without empty lines between paragraphs:

```
Vor mehr als zehntausend Jahren lebten in Nordamerika, in den Gebieten der heutigen Staaten Arizona, Neu­Mexiko, Texas, Colorado zahlreiche Jägergruppen, die nach einer Fundstätte ihrer Speerspitzen Folsomjäger genannt werden. Woher sie kamen und wie sie lebten, erzählt diese Geschichte.
Der Schneesturm
Nordwind tobt um kahle Tafelberge. Graugelb und rötlich heben sie sich gegen eine fast schwarze Wolkenwand ab, die der Sturm heranpeitscht Heulend wie eine Hyäne zwängt er sich in die Schlucht Felsen, steil und ausgehöhlt, begrenzen sie. Auf ihrem Grund strudelt über Steine und entwurzelte Bäume hinweg ein Fluß.
```

In this case, other replacements. Provide without a comment. Macro->Start Recording.

Find what:\r\n

Replace with:\r\n\r\n

Find what:.space

Replace with:.\r\n

Find what:?space

Replace with:.\r\n

Find what:!space

Replace with:.\r\n

Stop Recording. Save Currently Recorded Macro... You can call it No empty lines.
<br><br>

Finally, there are texts of the third type. Without dividing into lines and with empty lines between paragraphs:

```
Vor mehr als zehntausend Jahren lebten in Nordamerika, in den Gebieten der heutigen Staaten Arizona, Neu­Mexiko, Texas, Colorado zahlreiche Jägergruppen, die nach einer Fundstätte ihrer Speerspitzen Folsomjäger genannt werden. Woher sie kamen und wie sie lebten, erzählt diese Geschichte.

Der Schneesturm

Nordwind tobt um kahle Tafelberge. Graugelb und rötlich heben sie sich gegen eine fast schwarze Wolkenwand ab, die der Sturm heranpeitscht Heulend wie eine Hyäne zwängt er sich in die Schlucht Felsen, steil und ausgehöhlt, begrenzen sie. Auf ihrem Grund strudelt über Steine und entwurzelte Bäume hinweg ein Fluß.
```

In this case, you just need to distribute each sentence in a separate line.

Find what:.space

Replace with:.\r\n

Find what:?space

Replace with:.\r\n

Find what:!space

Replace with:.\r\n

Stop Recording. Save Currently Recorded Macro... You can call it With empty lines.
<br><br>

Format some text using one of the marcos. The result should look like this:

```
Vor mehr als zehntausend Jahren lebten in Nordamerika, in den Gebieten der heutigen Staaten Arizona, Neu­Mexiko, Texas, Colorado zahlreiche Jägergruppen, die nach einer Fundstätte ihrer Speerspitzen Folsomjäger genannt werden.
Woher sie kamen und wie sie lebten, erzählt diese Geschichte.

Der Schneesturm

Nordwind tobt um kahle Tafelberge.
Graugelb und rötlich heben sie sich gegen eine fast schwarze Wolkenwand ab, die der Sturm heranpeitscht Heulend wie eine Hyäne zwängt er sich in die Schlucht Felsen, steil und ausgehöhlt, begrenzen sie.
Auf ihrem Grund strudelt über Steine und entwurzelte Bäume hinweg ein Fluß.
```

Save the result - Ctrl+S. The text is ready for translation.
<br><br>

We go to the command line.

Win+R cmd

```
cd path to folder with scripts and text
python translate.py
```

We wait. The result will be in the file translation.txt .

Machine translation cannot be perfect. It needs to be proofreaded. For the convenience of proofreading, it is good to "assemble" the source text. To do this, you can make another macro. Macros->Start Recording.

Find what:\r\n

Replace with:space

Find what:2 spaces

Replace with:\r\n\r\n

Stop Recording. Save Currently Recorded Macro... You can call it Assemble.
<br><br>

So. What do we have as a result? Two scripts and four macros. Commands for the command line for convenience should be written to a file cmd.txt. If you need to install another model or use another model in translation, open the script with the same Notepad++ and change the name of the model. For example, if you download the open-mt-fr-en model, in the model_download script.py change facebook/wmt19-de-en to, for example, Helsinki-NLP/opus-mt-fr-ru, and wmt19-de-en to opus-mt-fr-en. If you change the model for translation, in the script translate.py change wmt19-de-en to opus-mt-fr-en.
<br><br>

This is what concerns the translation of texts. You can also use these models to translate subtitles in .srt format. To do this, create the following script:

```
import sys
import time
from pathlib import Path

from colorama import Fore, init
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

init()

model = './wmt19-de-en'

tokenizer = AutoTokenizer.from_pretrained(model)
model = AutoModelForSeq2SeqLM.from_pretrained(model)


def translate_phrase(phrase: str) -> str:
    inputs = tokenizer(phrase, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=100)
    out_text = tokenizer.batch_decode(output, skip_special_tokens=True)
    return out_text[0]


def load_files(path: str):
    translate_text = []
    files = [x for x in Path(path).iterdir() if Path(x).suffix in [".srt", ".vtt"]]
    for nm, file in enumerate(files):
        print(f"\n{Fore.GREEN}[{nm + 1}/{len(files)}] Processing file: {Path(file).name}")
        text = (x.strip() for x in open(file, "r", encoding="utf-8"))
        for txt in text:
            if not txt:
                translate_text.append(" \n")
            elif txt == "WEBVTT":
                translate_text.append(f'{txt}\n')
            elif txt[0].isdigit() and txt[-1].isdigit():
                translate_text.append(f'{txt}\n')
            else:
                translate_text.append(f'{translate_phrase(txt)}\n')
        save_srt(path, file, translate_text)
        translate_text.clear()


def save_srt(path: str, file: Path, translate_text: list):
    with open(f'{Path(path) / Path(file).name.split(Path(file).suffix)[0]}.translation.srt', "w", encoding="utf-8") as fl:
        for phrase in translate_text:
            fl.write(phrase)


def main():
    path = input("Input path to folder with files to translate\n>>>  ")
    time_start = time.monotonic()
    if not Path(path).exists() or not Path(path).is_dir():
        print("[!] Check that the path is entered correctly")
        sys.exit(0)
    load_files(path)
    print(f"\n\n{Fore.GREEN}All files are processed and saved")
    print(f'{Fore.CYAN}Elapsed time {Fore.RESET}| '
          f'{(int(time.monotonic() - time_start) // 3600) % 24:d} ч. '
          f'{(int(time.monotonic() - time_start) // 60) % 60:02d} м. '
          f'{int(time.monotonic() - time_start) % 60:02d} с.\n')


if __name__ == "__main__":
    main()
```

Create translatesubs.py and put this code in it.
<br><br>

Go to the command line.

Win+R cmd

```
cd path to folder with script
python translatesubs.py
path with subtitles
```

After 30 minutes, the translation is ready.
<br><br>

Code source: <https://codeby.net/threads/perevodim-tekst-s-pomoschju-predobuchennoj-modeli-transformers-hugging-face-i-python.81875/>