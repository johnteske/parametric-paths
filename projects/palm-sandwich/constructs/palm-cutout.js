const root = require("app-root-path");

const path = require(`${root}/path`);
const { mm } = require(`${root}/units`);

const palm = require(`${root}/objects/palm`);

const { width } = require("../constructs/frame");
const { cardOuterGeometry } = require("../constructs/card-outer");

const geometry = {
  width: palm.w,
  height: palm.h,
  x: (cardOuterGeometry.width - palm.w) / 2,
  y: width,
  radius: mm(9) // TODO palm object does not have radius // palm.r
};

const cutout = path.rect({
  width: palm.w,
  height: palm.h,
  radius: mm(9) // TODO palm object does not have radius // palm.r
});
cutout.translate([(cardOuterGeometry.width - palm.w) / 2, width]);

module.exports = {
  construct: () => cutout.clone(),
  geometry
};
