---
title: Перевод
---

[ChatGPT](/ru/chatgpt), помимо куда более нашумевшей возможности составлять правдоподобные тексты, имеет, по-моему, куда более значительную возможность - возможность перевода. В отличие от Google Translate или Yandex Translate, перевод ChatGPT куда более стабилен и целостен. Тем не менее, у самого ChatGPT есть ряд недостатков:

1) ChatGPT имеет ограничение на размер ввода. Текст надо вставлять в ChatGPT частями.

2) Чтобы использовать ChatGPT в России, надо создать фальшивый телефон для регистрации и включать VPN при использовании.

3) Сегодня-завтра OpenAI может прикрыть лавочку, сделать доступ платным.

Из-за этих недостатков нужен опенсорсный аналог ChatGPT. И он есть. Как он работает на поверхности? Вставляешь текст статьи в текстовый файл. Форматируешь макросами. Запускаешь скрипт. В случае средней статьи ждёшь 20 минут. И получаешь текстовый файл с переводом всей статьи.

На платформе [Hugging Face](https://huggingface.co/tasks/translation) можно найти опенсорсные языковые модели - нейронные сети, которые были обучены на больших массивах параллельного перевода. Для каждой пары языков - отдельная модель, обученная на своей базе параллельных переводов. Этими моделями можно пользоваться офлайн. Для этого нужно скачать веса модели. Для пар en-ru, ru-en, en-de, de-en есть хорошая модель [wmt-19](https://huggingface.co/facebook/wmt19-en-ru). Для всех остальных языков необходимо пользоваться [opus-mt](https://huggingface.co/Helsinki-NLP/opus-mt-fr-en).

Скачивание весов и перевод производятся с помощью скриптов на [Python](https://www.python.org/downloads/). При установке нужно нажать галочку у опции Add python.exe to PATH. После скачивания нужно установить необходимые пакеты:

Win+R cmd

pip install transformers[torch] sentencepiece sacremoses colorama
<br><br>

Скрипт для скачивания весов:

```
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

model_name = "facebook/wmt-19-en-ru"

tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

tokenizer.save_pretrained('./wmt-19-en-ru')
model.save_pretrained('./wmt-19-en-ru')
```

Создайте файл model_download.py и поместите в него этот код. Дальше нужно отправиться в командную строку.

Win+R cmd

```
cd путь к папке, в которой сохранятся веса
python model_download.py
```

В папке появится папка wmt-19-en-ru. У нас есть веса. Теперь создадим скрипт, который будет использовать эти веса для перевода.

Скрипт для перевода:

```
import time
from colorama import Fore, init
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

init()

tokenizer = AutoTokenizer.from_pretrained('./wmt19-en-ru')
model = AutoModelForSeq2SeqLM.from_pretrained('./wmt19-en-ru')

time_start = time.monotonic()

with open('text.txt', encoding="utf-8") as txt:
    lines = txt.readlines()

def translate_line(line: str) -> str:
    inputs = tokenizer(line, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=100)
    out_text = tokenizer.batch_decode(output, skip_special_tokens=True)
    return out_text[0]
	
print("Перевод...")

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
    
print(f"\n{Fore.GREEN}Перевод завершён")
print(f'{Fore.CYAN}Затраченное время {Fore.RESET}| '
     f'{(int(time.monotonic() - time_start) // 3600) % 24:d} ч. '
     f'{(int(time.monotonic() - time_start) // 60) % 60:02d} м. '
     f'{int(time.monotonic() - time_start) % 60:02d} с.\n')
```

Создайте файл translate.py и поместите в него этот код.
<br><br>

Итак, у нас есть веса и скрипт для перевода. Не хватает только текста.

Что это за форматирование макросами, упомянутое ранее? У моделей с сайта Hugging Face есть ограничение на длину ввода. Соответственно, модели нужно скармливать отдельные предложения. Для этого текст надо форматировать так, что в каждой строчке - одно предложение (нельзя разбивку текста на предложения доверить скрипту, ибо точка и пробел бывают не только в конце предложения, эти случаи надо править руками). Абзац - пустая строка.
<br><br>

Форматирование происходит автоматически - нужно один раз записать макрос замен в программе [Notepad++](https://notepad-plus-plus.org/downloads/).

Настройки Notepad++:

Опции->Настройки...-> Резервное Копирование->Запоминать текущую сессию для следующего запуска. Снять галочку. Данная настройка нужна для того, чтобы при открытии текстовых файлов не болтались ранее открытые текстовые файлы.
<br><br>

Приступим к созданию макросов. Создайте текстовый файл text.txt. Допустим, вы хотите перевести текст из PDF-файла с текстовым слоем. Вставляете его в text.txt. В этом случае ваш текст будет выглядеть следующим образом:

```
What is to be done?
That old question of Lenin’s, which initiated the
construction and the practices of the Bolshevik Party,
is not, for a communist who knows Marxist theory, a
question like any other. It is a political question. What is
to be done to help to orient and organize the workers’ and
the people’s class struggle so that it carries the day against
the bourgeois class struggle?
We should weigh all the words in this simple question.
```

Таким образом [Sumatra PDF](https://www.sumatrapdfreader.org/download-free-pdf-viewer) копирует текстовый слой у PDF-файлов. В этом случае необходимо обозначить абзацы с помощью пустых строк:

```
What is to be done?

That old question of Lenin’s, which initiated the
construction and the practices of the Bolshevik Party,
is not, for a communist who knows Marxist theory, a
question like any other. It is a political question. What is
to be done to help to orient and organize the workers’ and
the people’s class struggle so that it carries the day against
the bourgeois class struggle?

We should weigh all the words in this simple question.
```

Теперь, когда абзацы обозначены, мы можем приступить к записи макроса.

Макросы->Начать запись.

C помощью замен форматируем этот текст нужным образом.

Ctrl+H

Режим поиска Расширенный

В Notepad++ символ разрыва строки имеет обозначение \r\n. Делаем следующую замену:

Найти:\r\n

Заменить на:пробел (вместо слова пропиши символ)

Заменить все

В случае строк разрыв строки заменится пробелом. В случае абзаца получится два пробела (ибо пустая строка значит два разрыва строки). Этим мы воспользуемся в следующей замене:

Найти:2 пробела

Заменить на:\r\n\r\n

Два пробела заменились на два разрыва строки. Абзацы снова обозначены, только теперь ликвидировано деление на строки. Дальше мы определим каждое предложение в отдельную строчку. Для этого нужно сделать 3 замены:

Найти:.пробел

Заменить на:.\r\n

Найти:?пробел

Заменить на:.\r\n

Найти:!пробел

Заменить на:.\r\n

Остановить запись. Сохранить записанный макрос... Можете назвать его PDF.

Теперь все эти замены не нужно прописывать в ручную, но нужно просто запустить макрос PDF.

В этом случае повезло. В книгах, как правило, есть переносы. После работы скрипта текст с пе- реносами будет выглядеть пример- но так. Тут нужно вручную заменить дефис и пробел на ничто. Заменить все нельзя - так можно заменить дефисы.
<br><br>

Бывают тексты второго типа. Без деления на строки и без пустых строк между абзацами.

```
What is to be done?
That old question of Lenin’s, which initiated the construction and the practices of the Bolshevik Party, is not, for a communist who knows Marxist theory, a question like any other. It is a political question. What is to be done to help to orient and organize the workers’ and the people’s class struggle so that it carries the day against the bourgeois class struggle?
We should weigh all the words in this simple question.
```

В этом случае нужны свои замены. Привожу без комментариев. Макросы->Начать запись.

Найти:\r\n

Заменить на:\r\n\r\n

Найти:.пробел

Заменить на:.\r\n

Найти:?пробел

Заменить на:.\r\n

Найти:!пробел

Заменить на:.\r\n

Остановить запись. Сохранить записанный макрос... Можете назвать его Без пустых строк.
<br><br>

Наконец, бывают тексты третьего типа. Без деления на строки и c пустыми строками между абзацами:

```
What is to be done?

That old question of Lenin’s, which initiated the construction and the practices of the Bolshevik Party, is not, for a communist who knows Marxist theory, a question like any other. It is a political question. What is to be done to help to orient and organize the workers’ and the people’s class struggle so that it carries the day against the bourgeois class struggle?

We should weigh all the words in this simple question.
```

В этом случае нужно просто определить каждое предложение в отдельную строчку.  Макросы->Начать запись.

Найти:.пробел

Заменить на:.\r\n

Найти:?пробел

Заменить на:.\r\n

Найти:!пробел

Заменить на:.\r\n

Остановить запись. Сохранить записанный макрос... Можете назвать его С пустыми строками.
<br><br>

Форматируйте с помощью одного из маркосов какой-нибудь текст. Результат должен выглядеть следующим образом:

```
What is to be done?

That old question of Lenin’s, which initiated the construction and the practices of the Bolshevik Party, is not, for a communist who knows Marxist theory, a question like any other.
It is a political question.
What is to be done to help to orient and organize the workers’ and the people’s class struggle so that it carries the day against the bourgeois class struggle?

We should weigh all the words in this simple question.
```

Сохраните результат - Ctrl+S. Текст для перевода готов.
<br><br>

Отправляемся в командную строку.

Win+R cmd

```
cd путь к папке со скриптами и текстом
python translate.py
```

Ждём. Результат будет в файле translation.txt.
<br><br>

Машинный перевод не может быть идеальным. Его нужно вычитывать. Для удобства вычитки хорошо "собрать" исходный текст. Для этого можно сделать ещё один макрос. Макросы->Начать запись.

Найти:\r\n

Заменить на:пробел

Найти:2 пробела

Заменить на:\r\n\r\n

Остановить запись. Сохранить записанный макрос... Можете назвать его Сборка.
<br><br>

Итак. Что у нас есть по итогу? Два скрипта и четыре макроса. Команды для командной строки в целях удобства стоит записать в файлик cmd.txt. Если нужно установить другую модель или использовать другую модель в переводе, открываем скрипт тем же Notepad++ и изменяем название модели. Например, если скачиваешь модель open-mt-fr-en, в скрипте model_download.py меняешь facebook/wmt-19-en-ru на, например, Helsinki-NLP/opus-mt-fr-en, а wmt-19-en-ru на opus-mt-fr-en. Если меняешь модель для перевода, в скрипте translate.py меняешь wmt19-en-ru на opus-mt-fr-en.
<br><br>

Это что касается перевода текстов. С помощью этих моделей также можно переводить субтитры в формате .srt. Для этого создаёшь следующий скрипт:

```
import sys
import time
from pathlib import Path

from colorama import Fore, init
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

init()

tokenizer = AutoTokenizer.from_pretrained('./wmt19-en-ru')
model = AutoModelForSeq2SeqLM.from_pretrained('./wmt19-en-ru')


def translate_phrase(phrase: str) -> str:
    inputs = tokenizer(phrase, return_tensors="pt")
    output = model.generate(**inputs, max_new_tokens=100)
    out_text = tokenizer.batch_decode(output, skip_special_tokens=True)
    return out_text[0]


def load_files(path: str):
    translate_text = []
    files = [x for x in Path(path).iterdir() if Path(x).suffix in [".srt", ".vtt"]]
    for nm, file in enumerate(files):
        print(f"\n{Fore.GREEN}[{nm + 1}/{len(files)}] Обработка файла: {Path(file).name}")
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
    with open(f'{Path(path) / Path(file).name.split(Path(file).suffix)[0]}.ru.srt', "w", encoding="utf-8") as fl:
        for phrase in translate_text:
            fl.write(phrase)


def main():
    path = input("Введите путь к папке с файлами для перевода\n>>>  ")
    time_start = time.monotonic()
    if not Path(path).exists() or not Path(path).is_dir():
        print("[!] Проверьте правильность ввода пути")
        sys.exit(0)
    load_files(path)
    print(f"\n\n{Fore.GREEN}Все файлы обработаны и сохранены")
    print(f'{Fore.CYAN}Затраченное время {Fore.RESET}| '
          f'{(int(time.monotonic() - time_start) // 3600) % 24:d} ч. '
          f'{(int(time.monotonic() - time_start) // 60) % 60:02d} м. '
          f'{int(time.monotonic() - time_start) % 60:02d} с.\n')


if __name__ == "__main__":
    main()
```

Создайте файл translatesubs.py и поместите в него этот код.
<br><br>

Отправляешься в командную строку.

Win+R cmd

```
cd путь к папке со скриптом
python translatesubs.py
путь, где лежат субтитры
```

Через 30 минут перевод готов.
<br><br>

Источник кода: <https://codeby.net/threads/perevodim-tekst-s-pomoschju-predobuchennoj-modeli-transformers-hugging-face-i-python.81875/>