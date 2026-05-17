import bs4

files = [
    'c:\\belajar\\civest\\index.html',
    'c:\\belajar\\civest\\events.html'
]

order = ['nbc', 'nbdc', 'nptc', 'ncc', 'nbmdc']
delays = ['delay-100', 'delay-200', 'delay-300', 'delay-100', 'delay-200']

# Read the known-good index.html to copy its modal-body
with open(files[0], 'r', encoding='utf-8') as f:
    soup_idx = bs4.BeautifulSoup(f, 'html.parser')

# Look specifically for modal-competitions body
modal_comp_idx = soup_idx.find('div', id='modal-competitions')
modal_body_good = modal_comp_idx.find('div', class_='modal-body') if modal_comp_idx else None

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        html_content = f.read()
        
    soup = bs4.BeautifulSoup(html_content, 'html.parser')

    # Fix events.html
    if filepath.endswith('events.html') and modal_body_good:
        events_modal_comp = soup.find('div', id='modal-competitions')
        if events_modal_comp:
            events_modal_body = events_modal_comp.find('div', class_='modal-body')
            if events_modal_body:
                new_modal = bs4.BeautifulSoup(str(modal_body_good), 'html.parser').find('div', class_='modal-body')
                events_modal_body.replace_with(new_modal)
                soup = bs4.BeautifulSoup(str(soup), 'html.parser')

    # Reorder glass-grid (only in index.html)
    glass_grid = soup.find('div', class_='glass-grid')
    if glass_grid:
        cards = glass_grid.find_all('a', class_='glass-card')
        if cards:
            card_map = {c.get('data-open-comp', '').lower(): c for c in cards}
            glass_grid.clear()
            
            for i, comp in enumerate(order):
                if comp in card_map:
                    card = card_map[comp]
                    classes = card.get('class', [])
                    new_classes = [c for c in classes if not c.startswith('delay-')]
                    new_classes.append(delays[i])
                    card['class'] = new_classes
                    glass_grid.append(bs4.NavigableString('\n            '))
                    glass_grid.append(card)
            glass_grid.append(bs4.NavigableString('\n          '))

    # Reorder comp-list-grid in modal-competitions only
    modal_comp = soup.find('div', id='modal-competitions')
    if modal_comp:
        list_grid = modal_comp.find('div', class_='comp-list-grid')
        if list_grid:
            cards = list_grid.find_all('div', class_='comp-item-card')
            card_map = {c.get('data-comp', '').lower(): c for c in cards}
            list_grid.clear()
            for comp in order:
                if comp in card_map:
                    list_grid.append(bs4.NavigableString('\n                '))
                    list_grid.append(card_map[comp])
            list_grid.append(bs4.NavigableString('\n              '))

        # Reorder detail views
        detail_view = modal_comp.find('div', id='comp-detail-view')
        if detail_view:
            contents = detail_view.find_all('div', class_='comp-detail-content')
            content_map = {c.get('id', '').replace('detail-', '').lower(): c for c in contents}
            
            back_btn = detail_view.find('button', id='comp-back-btn')
            detail_view.clear()
            if back_btn:
                detail_view.append(bs4.NavigableString('\n              '))
                detail_view.append(back_btn)
                
            for comp in order:
                if comp in content_map:
                    detail_view.append(bs4.NavigableString(f'\n              <!-- {comp.upper()} -->\n              '))
                    detail_view.append(content_map[comp])
            detail_view.append(bs4.NavigableString('\n            '))

    # Clean up inline styles from logo placeholders
    placeholders = soup.find_all('div', class_='comp-item-logo-placeholder')
    for p in placeholders:
        if p.has_attr('style'):
            del p['style']

    html_output = str(soup)
    # Fix BS4 escaping comments
    html_output = html_output.replace('&lt;!--', '<!--').replace('--&gt;', '-->')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html_output)
    print(f"Processed {filepath}")
