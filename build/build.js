const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directories
const SOURCE_DIR = path.resolve(__dirname, '../');
const DEST_DIR = path.resolve(__dirname, '../public');

// Helper to ensure a directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Helper to copy a file
function copyFile(src, dest) {
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
}

// Step 1: Clean the public folder
function cleanPublicFolder() {
  console.log('Cleaning the public folder...');
  if (fs.existsSync(DEST_DIR)) {
    fs.rmSync(DEST_DIR, { recursive: true, force: true });
  }
  console.log('Public folder cleaned.');
}

// Step 2: Copy HTML files
function copyHTML() {
  console.log('Copying HTML files...');
  ensureDir(DEST_DIR);
  copyFile(path.join(SOURCE_DIR, 'pages/index.html'), path.join(DEST_DIR, 'index.html'));
  console.log('HTML files copied.');
}

// Step 3: Process and copy CSS
function processCSS() {
  console.log('Processing and copying CSS...');

  const tailwindCSSPath = path.join(SOURCE_DIR, "assets/css/tailwind-output.css");
  console.log('Merging Tailwind CSS into main.css...');
  if (!fs.existsSync(tailwindCSSPath)) {
    throw new Error(`File not found: ${tailwindCSSPath}`);
  }

  const inputCSS = path.join(SOURCE_DIR, 'assets/css/main.css');
  const outputCSS = path.join(DEST_DIR, 'css/output.min.css');

   // Append tailwind-output.css content to main.css
  const tailwindContent = fs.readFileSync(tailwindCSSPath, 'utf8');
  console.log('TAILWIND CONTENT =>', tailwindContent);
  fs.appendFileSync(inputCSS, `\n/* Tailwind CSS */\n${tailwindContent}`);


  ensureDir(path.join(DEST_DIR, 'css'));
  execSync(`npx postcss ${inputCSS} --config ./postcss.config.js | npx cleancss -o ${outputCSS}`);
  const outputFileContent = fs.readFileSync(outputCSS, "utf-8");
  console.log("outputFileContent =>", outputFileContent);
  console.log('CSS processed and copied.');
}

// Step 4: Minify and copy JavaScript
function processJS() {
  console.log('Processing and copying JavaScript...');
  const inputJS = path.join(SOURCE_DIR, 'assets/js/countdown.js');
  const outputJS = path.join(DEST_DIR, 'js/app.min.js');
  ensureDir(path.join(DEST_DIR, 'js'));
  execSync(`npx uglify-js ${inputJS} -o ${outputJS}`);
  console.log('JavaScript processed and copied.');
}

// Run all build steps
function build() {
  cleanPublicFolder();
  copyHTML();
  processCSS();
  processJS();
  console.log('Build complete!');
}

// Start the build process
build();
