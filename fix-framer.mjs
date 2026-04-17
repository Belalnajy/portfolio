import fs from 'fs';
import path from 'path';

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
};

const componentsDir = './src/components';
const files = walkSync(componentsDir).filter(f => f.endsWith('.jsx'));

let modifiedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  // Split the file roughly by <motion. tags
  let newContent = content.split('<motion.').map((part, index) => {
    if (index === 0) return part; // Code before first <motion.
    
    // We are inside a <motion. tag. 
    // Is there a whileInView?
    if (part.includes('whileInView={') && !part.includes('viewport={')) {
      // Find the end of the whileInView prop.
      // It can be `whileInView={{ ... }}` or `whileInView={someVar}`
      
      let replaceStr = '';
      if (part.includes('whileInView={{')) {
        // match whileInView={{ ... }}
        // we can find the matching double brace
        part = part.replace(/whileInView=\{\{[\s\S]*?\}\}/, (match) => {
            return match + '\n          viewport={{ once: true }}';
        });
      } else {
        // match whileInView={ ... }
        part = part.replace(/whileInView=\{[\s\S]*?\}/, (match) => {
            return match + '\n          viewport={{ once: true }}';
        });
      }
    }
    
    // What if viewport={...} is there, but doesn't have once: true?
    // Often it's viewport={{ amount: 0.2 }}. Let's inject once: true into existing viewport={{
    if (part.includes('whileInView={') && part.includes('viewport={{') && !part.includes('once: true')) {
        part = part.replace(/viewport=\{\{([\s\S]*?)\}\}/, (match, inner) => {
            return `viewport={{ once: true, ${inner} }}`;
        });
    }

    return part;
  }).join('<motion.');

  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    modifiedCount++;
    console.log(`Updated ${file}`);
  }
}

console.log(`Total files modified: ${modifiedCount}`);
