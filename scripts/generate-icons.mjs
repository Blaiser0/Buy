import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const source = new URL("../public/logo.png", import.meta.url);
const root = new URL("../", import.meta.url);

async function square(size) {
  const inset = Math.max(1, Math.round(size * 0.05));
  const logo = await sharp(fileURLToPath(source))
    .resize(size - inset * 2, size - inset * 2, { fit: "inside" })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: "#ffffff" },
  }).composite([{ input: logo, gravity: "centre" }]).png().toBuffer();
}

for (const [path, size] of [
  ["src/app/icon.png", 192],
  ["src/app/apple-icon.png", 180],
  // Preserve the previously public URL for existing bookmarks and crawlers.
  ["public/favicon.png", 48],
]) {
  await writeFile(new URL(path, root), await square(size));
}

// ICO directory with PNG-encoded images at native browser favicon sizes.
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(square));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(new URL("src/app/favicon.ico", root), Buffer.concat([header, ...images]));
