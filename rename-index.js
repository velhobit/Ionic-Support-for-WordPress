const fs = require("fs");
const path = require("path");

// Paths
const buildPath = path.join(__dirname, "www");
const oldFile = path.join(buildPath, "index.html");
const newFile = path.join(buildPath, "index.php");
const metaPath = path.join(__dirname, "meta.php");

const environmentPath = path.join(
  __dirname,
  "src/environments/environment.prod.ts"
);
const configPath = path.join(buildPath, "assets/config.json");

// Function to extract the environment object from environment.prod.ts
const extractEnvironment = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const match = content.match(/export const environment\s*=\s*({[\s\S]*?});/);
    if (match) {
      // Evaluate the matched environment object as a JavaScript object
      return eval(`(${match[1]})`);
    } else {
      throw new Error("Environment object not found in environment.prod.ts");
    }
  } catch (err) {
    console.error("Error reading or parsing environment.prod.ts:", err);
    return null;
  }
};

// Rename index.html to index.php
if (fs.existsSync(oldFile)) {
  fs.rename(oldFile, newFile, (err) => {
    if (err) {
      console.error("Error renaming file:", err);
    } else {
      console.log("index.html renamed to index.php successfully!");
    }
  });
} else {
  console.error("index.html not found!");
}

// Replace <!-- meta.php --> with the content of meta.php
console.log(metaPath);
if (fs.existsSync(newFile) && fs.existsSync(metaPath)) {
  const metaContent = fs.readFileSync(metaPath, "utf-8");
  const indexContent = fs.readFileSync(newFile, "utf-8");
  const updatedContent = indexContent.replace("<!-- meta.php -->", metaContent);

  fs.writeFileSync(newFile, updatedContent);
  console.log("meta.php content inserted successfully!");
} else {
  console.error("index.php or meta.php not found!");
}

// Create config.json from environment.prod.ts
if (fs.existsSync(environmentPath)) {
  const environment = extractEnvironment(environmentPath);
  if (environment) {
    const configDir = path.dirname(configPath);

    // Ensure the assets directory exists
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    fs.writeFile(configPath, JSON.stringify(environment, null, 2), (err) => {
      if (err) {
        console.error("Error creating config.json:", err);
      } else {
        console.log("config.json created successfully!");
      }
    });
  }
} else {
  console.error("environment.prod.ts not found!");
}
