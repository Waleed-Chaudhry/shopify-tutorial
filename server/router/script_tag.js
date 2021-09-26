import Router from "koa-router";

import {
  createScriptTag,
  deleteScriptTagById,
  getAllScriptTags,
} from "../controllers/script_tag_controller";

const router = new Router({ prefix: "/script_tag" });
// prefix is just the value that comes after the url
// So you'll navigate to the router as localhost:8081/script_tag

router.get("/", async (ctx) => {
  ctx.body = "Get script tag";
});

router.get("/all", async (ctx) => {
  const { shop, accessToken } = ctx.sessionFromToken;
  const result = await getAllScriptTags(shop, accessToken, "https://google.com/");
  ctx.body = {
    installed: result.length > 0,
    details: result,
  };
});

router.post("/", async (ctx) => {
  const { shop, accessToken } = ctx.sessionFromToken;
  await createScriptTag(shop, accessToken)
  ctx.body = "Create a script tag";
});

router.delete("/", async (ctx) => {
  const id = ctx.query.id;
  const { shop, accessToken } = ctx.sessionFromToken;
  const result = await deleteScriptTagById(shop, accessToken, id);
  ctx.body = result;
});

export default router;
