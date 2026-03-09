
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, 'src');

async function processDirectory(directory) {
    const files = fs.readdirSync(directory);

    for (const file of files) {
        const fullPath = path.join(directory, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await processDirectory(fullPath);
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.jfif'].includes(ext)) {
                const filename = path.basename(file, ext);
                const webpPath = path.join(directory, `${filename}.webp`);
                
                // Skip if webp already exists and is newer
                if (fs.existsSync(webpPath)) {
                   // console.log(`Skipping ${file}, webp already exists`);
                   // continue;
                }

                console.log(`Processing: ${file}`);

                try {
                    let pipeline = sharp(fullPath);
                    const metadata = await pipeline.metadata();

                    // Resize if too large
                    if (metadata.width > 1920) {
                        pipeline = pipeline.resize(1920, null, { withoutEnlargement: true });
                    }

                    await pipeline
                        .webp({ quality: 80 })
                        .toFile(webpPath);
                    
                    console.log(`Saved: ${filename}.webp`);
                } catch (error) {
                    console.error(`Error processing ${file}:`, error);
                }
            }
        }
    }
}

console.log('Starting image optimization...');
processDirectory(rootDir).then(() => {
    console.log('Optimization complete!');
});
