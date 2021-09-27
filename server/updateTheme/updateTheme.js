import Axios from "axios";
import fs from "fs";
import path from "path";

const themeApi = "admin/api/2021-01";

export async function updateTheme(shop, accessToken) {
  // Headers for the Axios Request
  const axios = Axios.create({
    baseURL: `https://${shop}/${themeApi}`,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": accessToken,
    },
  });

  // Step 1: Get Theme Id
  const mainThemeId = await getThemeId(axios);
  if (!mainThemeId) {
    return;
  }
  console.log('Theme ID: ', mainThemeId)

  // Step 2: Get Asset layout theme.liquid form Shopify and add our snippet to it
  const newPage = await getAssetThemeLiquid(mainThemeId, axios);

  if (newPage) {
    // Step 3: Upload the combined asset
    await uploadAssetTheme(axios, mainThemeId, newPage, "layout/theme.liquid");
  }

  // Step 4: For the second snippet, we just need to upload
  // No need to download an existing snippet and modtify that
  const newSnippet = getFile("../../liquid/waleed-test-app.liquid");
  await uploadAssetTheme(
    axios,
    mainThemeId,
    newSnippet,
    "snippets/waleed-test-app.liquid"
  );
}

/* Helper function to get Main Theme Id */
async function getThemeId(axios) {
  // Implementing https://shopify.dev/api/admin-rest/2021-07/resources/theme#[post]/admin/api/2021-07/themes.json
  const { data } = await axios.get("/themes.json");

  // Filter out the main theme only
  const mainTheme = data.themes.find((theme) => theme.role === "main");
  if (!mainTheme) {
    console.log("No main theme found");
    return;
  }
  console.log('The main theme is: ', mainTheme)
  return mainTheme.id;
}

/* Helper function to get the layout snippet theme.liquid and add our snippet to it*/
async function getAssetThemeLiquid(id, axios) {
  // Implementing https://shopify.dev/api/admin-rest/2021-07/resources/asset#[get]/admin/api/2021-07/themes/{theme_id}/assets.json
  const { data } = await axios.get(
    `/themes/${id}/assets.json?asset[key]=layout/theme.liquid`
  );
  if (!data.asset.value) {
    return; // If you don't find the asset at all
  }
  // Read our liquid file
  const snippet = getFile("../../liquid/theme.liquid");
  let newPage = data.asset.value;

  // Make sure that our hasn't already been installed
  if (newPage.includes(snippet)) {
    console.log("Page already has the snippet installed");
    return;
  }
  // Add our snippet
  newPage = data.asset.value.replace(
    "{% section 'header' %}",
    `\n{% section 'header' %}\n${snippet}\n`
  );
  return newPage;
}

/* Helper function used to read a local file */
function getFile(fileName) {
  return fs.readFileSync(path.resolve(__dirname, fileName), "utf-8");
}

/* Helper function to upload the final page to Shopify */
async function uploadAssetTheme(axios, id, page, pageName) {
  // Implementing: https://shopify.dev/api/admin-rest/2021-07/resources/asset#[put]/admin/api/2021-07/themes/{theme_id}/assets.json
  const body = {
    asset: {
      key: pageName,
      value: page,
    },
  };
  await axios.put(`/themes/${id}/assets.json`, body);
  console.log(`Upload page ${pageName}`);
}
