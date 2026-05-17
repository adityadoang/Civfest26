import re

def reorder_html(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    order = ['nbc', 'nbdc', 'nptc', 'ncc', 'nbmdc']

    # 1. Clean inline styles from placeholders to let CSS handle it
    content = re.sub(
        r'<div class="comp-item-logo-placeholder" style="width: 80px; height: 80px; font-size: 1rem; border-radius: 8px;">',
        r'<div class="comp-item-logo-placeholder">',
        content
    )

    # 2. Reorder glass-grid (only in index.html)
    if "glass-grid" in content:
        m = re.search(r'(<div class="glass-grid">)(.*?)(</div>\s*</div>\s*</section>)', content, re.DOTALL)
        if m:
            prefix = m.group(1)
            grid = m.group(2)
            suffix = m.group(3)
            
            cards = re.findall(r'(<a href="#" data-open-modal="modal-competitions" data-open-comp="([^"]+)".*?</a>)', grid, re.DOTALL)
            card_map = {comp.lower(): full for full, comp in cards}
            
            if len(card_map) == 5:
                new_grid = ""
                delays = [100, 200, 300, 100, 200]
                for i, comp in enumerate(order):
                    card_html = card_map[comp]
                    card_html = re.sub(r'delay-\d+', f'delay-{delays[i]}', card_html)
                    new_grid += "\n            " + card_html
                new_grid += "\n          "
                content = content[:m.start()] + prefix + new_grid + suffix + content[m.end():]

    # 3. Reorder comp-list-grid
    m2 = re.search(r'(<div class="comp-list-grid">)(.*?)(</div>\s*</div>\s*<!-- Detail View -->)', content, re.DOTALL)
    if m2:
        prefix = m2.group(1)
        grid = m2.group(2)
        suffix = m2.group(3)
        
        # Regex to safely find comp-item-card divs (assuming they have 3 inner divs)
        cards = re.findall(r'(<div class="comp-item-card" data-comp="([^"]+)">.*?</div>\s*</div>\s*</div>)', grid, re.DOTALL)
        card_map = {comp.lower(): full for full, comp in cards}
        
        if len(card_map) == 5:
            new_grid = ""
            for comp in order:
                new_grid += "\n                " + card_map[comp]
            new_grid += "\n              "
            content = content[:m2.start()] + prefix + new_grid + suffix + content[m2.end():]

    # 4. Reorder Detail View
    # Use split instead of regex to avoid swallowing the content!
    m3 = re.search(r'(<!-- Detail View -->.*?<button id="comp-back-btn"[^>]*>.*?</button>)(.*?)(</div>\s*</div>\s*</div>\s*</div>)', content, re.DOTALL)
    if m3:
        prefix = m3.group(1)
        details_block = m3.group(2)
        suffix = m3.group(3)
        
        # Split by <!-- COMP_NAME -->
        chunks = re.split(r'\n\s*<!-- ([A-Z]+) -->\n\s*', details_block)
        
        # chunks will be ['', 'NBMDC', '<div...>', 'NPTC', '<div...>', ...]
        detail_map = {}
        for i in range(1, len(chunks), 2):
            comp_name = chunks[i].lower()
            detail_html = chunks[i+1]
            detail_map[comp_name] = detail_html
            
        if len(detail_map) == 5:
            new_details = ""
            for comp in order:
                new_details += "\n              <!-- " + comp.upper() + " -->\n              " + detail_map[comp].strip() + "\n"
            content = content[:m3.start()] + prefix + new_details + suffix + content[m3.end():]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Processed {filepath}")

reorder_html('c:\\belajar\\civest\\index.html')
reorder_html('c:\\belajar\\civest\\events.html')
