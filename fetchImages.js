const fs = require('fs');
const { searchImages, SafeSearchType } = require('duck-duck-scrape');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
    let content = fs.readFileSync('src/components/build/data.ts', 'utf8');

    const parts = [];
    const regex = /\{ id: "([^"]+)", name: "([^"]+)"([^}]+) image: "([^"]+)" \}/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        // Only fetch if image is a placeholder
        if (match[4].includes('picsum.photos')) {
            parts.push({
                fullMatch: match[0],
                id: match[1],
                name: match[2],
                rest: match[3],
                oldImage: match[4]
            });
        }
    }

    console.log(`Found ${parts.length} parts to update.`);

    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        console.log(`[${i+1}/${parts.length}] Searching for: ${part.name}`);
        try {
            const results = await searchImages(part.name + ' pc component', {
                safeSearch: SafeSearchType.MODERATE
            });
            
            if (results && results.results && results.results.length > 0) {
                const imgUrl = results.results[0].image;
                console.log(`  -> Found: ${imgUrl}`);
                
                content = content.replace(part.fullMatch, `{ id: "${part.id}", name: "${part.name}"${part.rest} image: "${imgUrl}" }`);
            } else {
                console.log(`  -> No results found.`);
            }
        } catch (e) {
            console.error(`  -> Error searching: ${e.message}`);
        }
        
        await sleep(500);
    }

    fs.writeFileSync('src/components/build/data.ts', content);
    console.log('Finished updating data.ts with real image URLs.');
}

main();
