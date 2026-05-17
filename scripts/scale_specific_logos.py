import re

files = [
    'c:\\belajar\\civest\\index.html',
    'c:\\belajar\\civest\\events.html'
]

# The logos the user wants enlarged
target_logos = ['NPTC.png', 'NCC.png', 'NBMDC.png']
scale_factor = "1.25" # Enlarge by 25%

for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Reset any weird width/height user might have added manually
    # user added style="width: 200%; height: 200%; object-fit: contain;"
    content = re.sub(r'width:\s*200%;\s*height:\s*200%;', 'width: 100%; height: 100%;', content)

    # We want to find images that match target_logos and add transform: scale() to them
    # But only if they don't already have a scale. Let's reset scale first.
    content = re.sub(r'\s*transform:\s*scale\([^)]+\);', '', content)
    
    # Now inject the scale into the style attribute of those specific images
    for logo in target_logos:
        # Regex to find <img ... src="/lombatra/LOGO.png" ... style="..." />
        # and insert transform: scale(1.25); into the style attribute.
        
        # We need a function to replace it
        def replacer(match):
            img_tag = match.group(0)
            if 'style="' in img_tag:
                return img_tag.replace('style="', f'style="transform: scale({scale_factor}); ')
            elif "style='" in img_tag:
                return img_tag.replace("style='", f"style='transform: scale({scale_factor}); ")
            else:
                return img_tag.replace('<img ', f'<img style="transform: scale({scale_factor});" ')

        pattern = r'<img[^>]*src="[^"]*/lombatra/' + re.escape(logo) + r'"[^>]*>'
        content = re.sub(pattern, replacer, content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Scaled logos in {filepath}")
