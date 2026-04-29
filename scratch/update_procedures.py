import re

with open('src/constants/procedures.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add image property to Feature if not present
if 'image?: string;' not in content:
    content = content.replace('effects?: string[];', 'effects?: string[];\n  image?: string;')

categories = [
    ('thermage', '/images/lifting_texture.png'),
    ('skin-booster', '/images/booster_texture.png'),
    ('petit', '/images/petit_texture.png'),
    ('laser', '/images/laser_texture.png'),
]

for cat, img in categories:
    # Match the block for the category
    pattern = re.compile(rf"(slug:\s*'{cat}'.*?)(?=\s+slug:\s*'.*?'|\Z)", re.DOTALL)
    match = pattern.search(content)
    if match:
        block = match.group(1)
        # Replace icon: '...', with icon: '...', image: '...'
        new_block = re.sub(r"(icon:\s*'.*?',)", rf"\1\n        image: '{img}',", block)
        content = content[:match.start()] + new_block + content[match.end():]

with open('src/constants/procedures.ts', 'w', encoding='utf-8') as f:
    f.write(content)
