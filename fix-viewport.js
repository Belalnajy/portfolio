const fs = require('fs');
const glob = require('glob');

(async () => {
    const { glob } = await import('glob');
    const files = await glob('src/components/**/*.jsx', { ignore: 'node_modules/**' });
    let totalModified = 0;

    for (const file of files) {
        let content = fs.readFileSync(file, 'utf8');
        let modified = false;

        // The issue: We need to find <motion.* tags that have whileInView=... but DO NOT have viewport=...
        // This regex looks for whileInView={...} and makes sure it's inside a tag.
        // A simpler regex replace:
        // Replace whileInView={{...}} with whileInView={{...}} viewport={{ once: true }}
        // But only if viewport is not already present.
        
        const newContent = content.replace(/(whileInView=\{.*?\})/g, (match, p1) => {
            return p1;
        });

        // Let's do something simpler: Just find whileInView={...} and append viewport={{ once: true }} if not followed by viewport
        // Actually, since React props can be in any order, let's just do a regex that matches `whileInView=` and if the block (like `<motion.div ...>`) doesn't contain `viewport={{ once: true }}`, insert it.
        
        let inMotionTag = false;
        let modifiedContent = '';
        
        // Let's just use string replacement on a per-element basis? Wait, just doing:
        // content = content.replace(/(whileInView=\{[^\}]+\})(?!\s*viewport)/g, "$1 viewport={{ once: true }}");
        
        content = content.replace(/(whileInView=\{[^}]+\})\s*(?!viewport)/g, "$1 viewport={{ once: true }}\n          ");
        
        // Wait, the regex above handles cases like `whileInView={{ opacity: 1 }}` and checks if next word is not viewport. What if viewport is BEFORE whileInView?
        // Better: let's just ensure viewport={{ once: true }} is present using a custom JS parser, or just let users replace it.
        
    }
})();
