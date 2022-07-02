import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testPOI, ireland } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Playlist Model tests", () => {

  setup(async () => {
    db.init("mongo");
    await db.poiStore.deleteAllPOIs();
    for (let i = 0; i < testPOI.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      testPOI[i] = await db.poiStore.addPOI(testPOI[i]);
    }
  });

  test("create a poi", async () => {
    const poi = await db.poiStore.addPOI(ireland);
    assertSubset(ireland, poi);
    assert.isDefined(poi._id);
  });

  test("delete all poi", async () => {
    let returnedPOI = await db.poiStore.getAllPOI();
    assert.equal(returnedPOI.length, 6);
    await db.poiStore.deleteAllPOIs();
    returnedPOI = await db.poiStore.getAllPOI();
    assert.equal(returnedPOI.length, 0);
  });

  test("get a poi - success", async () => {
    const poi = await db.poiStore.addPOI(ireland);
    const returnedPOI = await db.poiStore.getPOIById(poi._id);
    assertSubset(ireland, poi);
  });

  test("delete One POI - success", async () => {
    const id = testPOI[0]._id;
    await db.poiStore.deletePOIById(id);
    const returnedPOI = await db.poiStore.getAllPOI();
    assert.equal(returnedPOI.length, testPOI.length - 1);
    const deletedPOI = await db.poiStore.getPOIById(id);
    assert.isNull(deletedPOI);
  });

  test("get a poi - bad params", async () => {
    assert.isNull(await db.poiStore.getPOIById(""));
    assert.isNull(await db.poiStore.getPOIById());
  });

  test("delete One POI - fail", async () => {
    await db.poiStore.deletePOIById("bad-id");
    const allPOI = await db.poiStore.getAllPOI();
    assert.equal(testPOI.length, allPOI.length);
  });
});
