import { readFileSync, writeFileSync, existsSync, mkdirSync, rmSync, unlinkSync, readdirSync } from 'fs';
import { execSync } from 'child_process';
import { join } from 'path';

function processTemplate(filePath, name, directory, filename) {
  // read file
  const template = readFileSync(
    join(filePath),
    'utf8'
  );

  const plays = Math.floor(Math.random() * (5000 - 500 + 1)) + 500;
  // convert snake-case to CamelCase
  const camelCaseName = name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  const content = template.replace(/{{name}}/g, name)
    .replace(/{{CamelCaseName}}/g, camelCaseName)
    .replace(/{{plays}}/g, plays + '');
  // write the file to src/routes/name/+page.svelte
  writeFileSync(
    join(directory, filename),
    content,
    'utf8'
  );
  console.log(`File created: ${directory}/${filename}`);
}

function scaffold(name) {
  // create the directory structure
  const pagesDir = join('./src/routes', name);
  const gameDir = join('./src/routes/games', name);
  const configDir = './src/lib/data/games';
  // create the directories
  if (!existsSync(pagesDir)) {
    mkdirSync(pagesDir, { recursive: true });
  }
  if (!existsSync(gameDir)) {
    mkdirSync(gameDir, { recursive: true });
  }
  processTemplate('./src/templates/+page.svelte', name, pagesDir, "+page.svelte");
  processTemplate('./src/templates/games/+page.svelte', name, gameDir, "+page.svelte");
  processTemplate('./src/templates/game.json', name, configDir, `${name}.json`);
  processTemplate('./src/templates/game.md', name, configDir, `${name}.md`);
}

function remove(name) {
  // remove the directory structure
  const pagesDir = join('./src/routes', name);
  const gameDir = join('./src/routes/games', name);
  const configDir = './src/lib/data/games';
  // remove the directories
  if (existsSync(pagesDir)) {
    rmSync(pagesDir, { recursive: true });
  }
  if (existsSync(gameDir)) {
    rmSync(gameDir, { recursive: true });
  }
  if (existsSync(join(configDir, `${name}.json`))) {
    unlinkSync(join(configDir, `${name}.json`));
  }
  if (existsSync(join(configDir, `${name}.md`))) {
    unlinkSync(join(configDir, `${name}.md`));
  }
}

function convertToWebp(name) {
  const folder = '../game/';
  // find ../game/{name} with extension .png/.jpg/.avif, if exists, convert to webp
  const files = readdirSync(folder);
  // filter files with name
  const gameFiles = files.filter(file => file.startsWith(name));
  // filter files with extension .png/.jpg/.avif
  // check if webp file already exists
  const webpFiles = gameFiles.filter(file => file.endsWith('.webp'));
  if (webpFiles.length > 0) {
    console.log(`Webp file already exists for ${name}`);
    return;
  }
  const gameFilesWithExtension = gameFiles.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.avif'));
  if (gameFilesWithExtension.length > 0) {
    const file = gameFilesWithExtension[0];
    const filePath = join(folder, file);
    const webpFilePath = filePath.replace(/\.(png|jpg|avif)$/, '.webp');
    execSync(`cwebp -q 80 ${filePath} -o ${webpFilePath}`, { stdio: 'ignore' });
    console.log(`Converted ${file} to ${webpFilePath}`);
  } else {
    console.log(`No files found for ${name}`);
  }
}

function convertAllToWebp() {
  const folder = '../game/';
  // find all files with extension .png/.jpg/.avif, if exists, convert to webp
  const files = readdirSync(folder);
  // filter files with extension .png/.jpg/.avif
  const gameFiles = files.filter(file => file.endsWith('.png') || file.endsWith('.jpg') || file.endsWith('.avif'));
  // check if webp file already exists
  const webpFiles = gameFiles.filter(file => file.endsWith('.webp'));
  if (webpFiles.length > 0) {
    console.log(`Webp file already exists for ${name}`);
    return;
  }
  gameFiles.forEach(file => {
    const filePath = join(folder, file);
    const webpFilePath = filePath.replace(/\.(png|jpg|avif)$/, '.webp');
    // conver silently
    execSync(`cwebp -q 80 ${filePath} -o ${webpFilePath}`, { stdio: 'ignore' });
    console.log(`Converted ${file} to ${webpFilePath}`);
  });
}

function main() {
  const argv = process.argv.slice(2);
  if (argv.length > 2 || argv.length < 1) { 
    console.error('Usage: node scaffold.js <name>');
    process.exit(1);
  }
  if (argv[0] === 'del') {
    remove(argv[1]);
  } else if (argv[0] === 'webp') {
    convertToWebp(argv[1]);
  } else if (argv[0] === 'webp-all') {
    convertAllToWebp();
  } else if (argv[0] === 'add') {
    const name = argv[1];
    scaffold(name);
  }
}

main();