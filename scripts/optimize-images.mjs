/**
 * Generates WebP versions of everything in src/assets.
 *
 * Originals are left untouched — this only adds `.webp` siblings, so the
 * conversion is fully reversible by deleting them and reverting the imports.
 *
 * Run with: npm run optimize:images
 */
import { readdir, stat } from 'node:fs/promises';
import { join, extname, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ASSETS_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets');
const SOURCE_EXTENSIONS = new Set(['.png', '.jpg', '.jpeg']);

// Nothing here is displayed wider than ~1200 CSS px, and most are shown far
// smaller. Certificates need the extra width because they're read full-screen.
const MAX_WIDTH = 1600;
const QUALITY = 82;

const format = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

async function main() {
  const entries = await readdir(ASSETS_DIR);
  const images = entries.filter((name) =>
    SOURCE_EXTENSIONS.has(extname(name).toLowerCase())
  );

  let before = 0;
  let after = 0;

  for (const name of images) {
    const inputPath = join(ASSETS_DIR, name);
    const outputPath = join(ASSETS_DIR, `${basename(name, extname(name))}.webp`);

    const { size: originalSize } = await stat(inputPath);

    const { size: newSize } = await sharp(inputPath)
      .rotate()
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY, effort: 5 })
      .toFile(outputPath);

    before += originalSize;
    after += newSize;

    const saved = ((1 - newSize / originalSize) * 100).toFixed(0);
    console.log(
      `${name.padEnd(42)} ${format(originalSize).padStart(9)} -> ${format(newSize).padStart(9)}  (-${saved}%)`
    );
  }

  console.log('\n' + '-'.repeat(78));
  console.log(
    `${images.length} images: ${format(before)} -> ${format(after)} ` +
      `(-${((1 - after / before) * 100).toFixed(1)}%)`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
