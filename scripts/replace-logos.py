import re

files_to_process = [
    'c:\\belajar\\civest\\index.html',
    'c:\\belajar\\civest\\events.html'
]

replacements = [
    ("nbmdc", "NBMDC"),
    ("nptc", "NPTC"),
    ("nbdc", "NBDC"),
    ("ncc", "NCC"),
    ("nbc", "NBC"),
]

def replace_logos(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for glass-card and comp-item-card
    for comp_lower, comp_upper in replacements:
        # 1. glass-card
        pattern1 = f'(data-open-comp="{comp_lower}".*?<div class="comp-item-logo-placeholder"[^>]*>.*?)<img src="/placeholder-logo.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; opacity: 0.5;" />(.*?)</div>'
        replacement1 = f'\\1<img src="/lomba/{comp_upper}.png" alt="{comp_upper} Logo" style="width: 100%; height: 100%; object-fit: contain;" />\\2</div>'
        content = re.sub(pattern1, replacement1, content, flags=re.DOTALL)

        # 2. comp-item-card
        pattern2 = f'(<div class="comp-item-card" data-comp="{comp_lower}">\\s*<div class="comp-item-logo-placeholder">)<img src="/placeholder-logo.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; opacity: 0.5;" />(</div>\\s*<div class="comp-item-text">\\s*<h4>{comp_upper}</h4>)'
        replacement2 = f'\\1<img src="/lomba/{comp_upper}.png" alt="{comp_upper} Logo" style="width: 100%; height: 100%; object-fit: contain;" />\\2'
        content = re.sub(pattern2, replacement2, content, flags=re.DOTALL)

        # 3. comp-detail-content
        pattern3 = f'(<div class="comp-detail-content" id="detail-{comp_lower}"[\\s\\S]*?<div class="comp-logo">)<img src="/placeholder-logo.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain; opacity: 0.5;" />(</div>)'
        replacement3 = f'\\1<img src="/lomba/{comp_upper}.png" alt="{comp_upper} Logo" style="width: 100%; height: 100%; object-fit: contain;" />\\2'
        content = re.sub(pattern3, replacement3, content, flags=re.DOTALL)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

for filepath in files_to_process:
    replace_logos(filepath)
    print(f"Processed {filepath}")
