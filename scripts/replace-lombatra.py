import re

files_to_process = [
    'c:\\belajar\\civest\\index.html',
    'c:\\belajar\\civest\\events.html'
]

def replace_logos(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace /lomba/ with /lombatra/
    content = content.replace('/lomba/', '/lombatra/')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filepath in files_to_process:
    replace_logos(filepath)
    print(f"Processed {filepath}")
