import re

files = [
    'c:\\belajar\\civest\\index.html',
    'c:\\belajar\\civest\\events.html'
]

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    def replacer(match):
        img_tag = match.group(0)
        # remove style attribute entirely
        clean_img = re.sub(r'\s*style="[^"]*"', '', img_tag)
        clean_img = re.sub(r"\s*style='[^']*'", '', clean_img)
        return clean_img

    pattern = r'<img[^>]+src="/lombatra/[^"]+"[^>]*>'
    content = re.sub(pattern, replacer, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f'Cleaned inline img styles in {filepath}')
