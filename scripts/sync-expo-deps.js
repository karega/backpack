const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const isCi = process.env.CI === "true";

if (isCi) {
  process.exit(0);
}

const dryRun = process.argv.includes("--dry-run");

const PACKAGES = new Set(["@gorhom/bottom-sheet"]);
const directories = ["packages/*", "examples/xnft/*"];

let hasChanges = false;

(async function main() {
  directories.forEach((dir) => {
    const packagePaths = execSync(`ls ${dir}/package.json`, {
      encoding: "utf-8",
    })
      .split("\n")
      .filter(Boolean);

    packagePaths.forEach((packagePath) => {
      if (packagePath === "packages/app-mobile/package.json") {
        return;
      }

      const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

      ["dependencies", "devDependencies", "peerDependencies"].forEach(
        (depType) => {
          if (packageJson[depType]) {
            let changes = {};

            if (Object.keys(changes).length > 0) {
              hasChanges = true;

              if (dryRun) {
                console.log(changes);
                console.log(
                  `\x1b[33m→\x1b[0m Run without --dry-run to apply them. Then run yarn`
                );
              } else {
                packageJson[depType] = { ...packageJson[depType], ...changes };
                fs.writeFileSync(
                  packagePath,
                  JSON.stringify(packageJson, null, 2) + "\n"
                );
                console.log(`Updated ${packagePath}. Now run yarn.`);
                console.log(changes);
              }
            }
          }
        }
      );
    });
  });

  if (dryRun && hasChanges) {
    process.exit(1);
  }
})();

// https://github.com/expo/expo/blob/sdk-50/packages/expo/bundledNativeModules.json
async function _fetchBundledNativeModulesForSdkVersion(version) {
  const url = `https://raw.githubusercontent.com/expo/expo/sdk-${version}/packages/expo/bundledNativeModules.json`;
  try {
    const data = await fetch(url).then((r) => r.json());
    return data;
  } catch (error) {
    console.error("error fetching bundledNativeModules.json, skipping...");
    return {};
  }
}
