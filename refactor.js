const fs = require('fs');
const path = require('path');

const directories = [
    'c:/Users/BlackPavilionDos/Desktop/app-crystal-cove/pages',
    'c:/Users/BlackPavilionDos/Desktop/app-crystal-cove/components'
];

const replacements = [
    // Full screen backgrounds
    [/\bflex-1 bg-white\b/g, 'flex-1 bg-dark-bg'],
    [/\bflex-1 bg-gray-50\b/g, 'flex-1 bg-dark-bg'],
    [/backgroundColor: '#0f2557'/g, "backgroundColor: '#0a0a0a'"],
    
    // Backgrounds
    [/\bbg-white\b/g, 'bg-dark-surface'],
    [/\bbg-gray-50\b/g, 'bg-dark-bg'],
    [/\bbg-slate-900\b/g, 'bg-dark-surfaceAlt'],
    [/\bbg-blue-50\b/g, 'bg-dark-surfaceAlt'],
    [/\bbg-blue-100\b/g, 'bg-dark-surfaceAlt'],
    [/\bbg-blue-600\b/g, 'bg-gold'],
    [/\bbg-blue-950\b/g, 'bg-gold-dark'],
    [/\bbg-white\/80\b/g, 'bg-dark-surface/80'],
    [/\bbg-black\/5\b/g, 'bg-white/5'],
    [/\bbg-black\/10\b/g, 'bg-white/10'],
    
    // Text
    [/\btext-blue-950\b/g, 'text-gold'],
    [/\btext-gray-800\b/g, 'text-white'],
    [/\btext-gray-700\b/g, 'text-gray-300'],
    [/\btext-gray-500\b/g, 'text-gray-400'],
    [/\btext-blue-600\b/g, 'text-gold-light'],
    [/\btext-green-600\b/g, 'text-gold'],
    [/\btext-green-400\b/g, 'text-gold-light'],
    [/\btext-blue-400\b/g, 'text-gold-light'],
    
    // Borders
    [/\bborder-gray-100\b/g, 'border-dark-surfaceAlt'],
    [/\bborder-gray-200\b/g, 'border-dark-surfaceAlt'],
    [/\bborder-gray-300\b/g, 'border-dark-surfaceAlt'],
    [/\bborder-blue-950\b/g, 'border-gold'],
    
    // Colors
    [/color="#172554"/g, 'color="#d4af37"'],
    [/color="#3b82f6"/g, 'color="#fde047"']
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            const original = content;
            
            for (const [pattern, repl] of replacements) {
                content = content.replace(pattern, repl);
            }
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${file}`);
            }
        }
    }
}

for (const dir of directories) {
    if (fs.existsSync(dir)) {
        processDirectory(dir);
    }
}
