import os
import re

directories = [
    'c:/Users/BlackPavilionDos/Desktop/app-crystal-cove/pages',
    'c:/Users/BlackPavilionDos/Desktop/app-crystal-cove/components'
]

replacements = {
    # Full screen backgrounds
    r'\bflex-1 bg-white\b': 'flex-1 bg-dark-bg',
    r'\bflex-1 bg-gray-50\b': 'flex-1 bg-dark-bg',
    r'\bbackgroundColor: \'#0f2557\'\b': 'backgroundColor: \'#0a0a0a\'',
    
    # Backgrounds
    r'\bbg-white\b': 'bg-dark-surface',
    r'\bbg-gray-50\b': 'bg-dark-bg',
    r'\bbg-slate-900\b': 'bg-dark-surfaceAlt',
    r'\bbg-blue-50\b': 'bg-dark-surfaceAlt',
    r'\bbg-blue-100\b': 'bg-dark-surfaceAlt',
    r'\bbg-blue-600\b': 'bg-gold',
    r'\bbg-blue-950\b': 'bg-gold-dark',
    r'\bbg-white/80\b': 'bg-dark-surface/80',
    r'\bbg-black/5\b': 'bg-white/5',
    r'\bbg-black/10\b': 'bg-white/10',
    
    # Text
    r'\btext-blue-950\b': 'text-gold',
    r'\btext-gray-800\b': 'text-white',
    r'\btext-gray-700\b': 'text-gray-300',
    r'\btext-gray-500\b': 'text-gray-400',
    r'\btext-blue-600\b': 'text-gold-light',
    r'\btext-green-600\b': 'text-gold',
    r'\btext-green-400\b': 'text-gold-light',
    r'\btext-blue-400\b': 'text-gold-light',
    
    # Borders
    r'\bborder-gray-100\b': 'border-dark-surfaceAlt',
    r'\bborder-gray-200\b': 'border-dark-surfaceAlt',
    r'\bborder-gray-300\b': 'border-dark-surfaceAlt',
    r'\bborder-blue-950\b': 'border-gold',
    
    # Colors
    r'color="#172554"': 'color="#d4af37"', # gold
    r'color="#3b82f6"': 'color="#fde047"'  # light gold
}

for d in directories:
    for root, dirs, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                filepath = os.path.join(root, file)
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                original = content
                for pattern, repl in replacements.items():
                    content = re.sub(pattern, repl, content)
                
                if original != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(content)
                    print(f"Updated {file}")
