import axios from "axios";

/* 
 * The Endpoints as defined in the Endpoints section of shopify docs
 * https://shopify.dev/api/admin-rest/2021-07/resources/scripttag#[get]/admin/api/2021-07/script_tags.json
 */

function getBaseUrl(shop) {
  return `https://${shop}`;
}

function getAllScriptTagsUrl(shop) {
  return `${getBaseUrl(shop)}/admin/api/2021-01/script_tags.json`;
}

/*
 * Implement the request defined within the shopify docs
 */

export async function createScriptTag(shop, token) {
  const url = getAllScriptTagsUrl(shop)
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token
    }
  }
  const body = {
    "script_tag": {
      "event":"onload",
      "src":"https://google.com"
    }
  }
  try {
    const result = await axios.post(url, body, config);
    console.log(result.data)
  } catch (err) {
    console.log('Error creating a new tag', err)
  }
}

