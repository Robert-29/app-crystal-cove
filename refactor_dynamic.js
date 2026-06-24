const fs = require('fs');
const path = require('path');

const directories = [
    'c:/Users/BlackPavilionDos/Desktop/app-crystal-cove/pages',
    'c:/Users/BlackPavilionDos/Desktop/app-crystal-cove/components'
];

// Map of dark classes back to light + dark
const replacements = [
    // Backgrounds
    [/\bflex-1 bg-dark-bg\b/g, 'flex-1 bg-gray-50 dark:bg-dark-bg'],
    [/\bbg-dark-surface\b/g, 'bg-white dark:bg-dark-surface'],
    [/\bbg-dark-bg\b/g, 'bg-gray-50 dark:bg-dark-bg'],
    [/\bbg-dark-surfaceAlt\b/g, 'bg-gray-100 dark:bg-dark-surfaceAlt'],
    
    // Text
    [/\btext-gold\b/g, 'text-blue-950 dark:text-gold'],
    [/\btext-white\b/g, 'text-gray-800 dark:text-white'],
    [/\btext-gray-300\b/g, 'text-gray-700 dark:text-gray-300'],
    [/\btext-gray-400\b/g, 'text-gray-500 dark:text-gray-400'],
    [/\btext-gold-light\b/g, 'text-blue-600 dark:text-gold-light'],
    
    // Borders
    [/\bborder-dark-surfaceAlt\b/g, 'border-gray-200 dark:border-dark-surfaceAlt'],
    [/\bborder-gold\b/g, 'border-blue-950 dark:border-gold']
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
            
            // Apply color replacements
            for (const [pattern, repl] of replacements) {
                // Prevent duplicate prefixes if script runs multiple times
                content = content.replace(pattern, (match) => {
                    if (content.includes(`dark:${match}`) || content.includes(repl)) return match;
                    return repl;
                });
            }

            // Ensure fonts are applied. Add font-sans to <Text> without font-serif
            content = content.replace(/<Text\s+className="([^"]+)"/g, (match, classes) => {
                let newClasses = classes;
                if (!newClasses.includes('font-serif') && !newClasses.includes('font-sans')) {
                    newClasses += ' font-sans';
                }
                return `<Text className="${newClasses}"`;
            });
            
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
