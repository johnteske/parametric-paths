const root = require("app-root-path");

const path = require(`${root}/path`);
const { subtract } = require(`${root}/boolean`);
const { mm } = require(`${root}/units`);
const { pipe } = require(`${root}/fn`);

//const palm = require(`${root}/objects/palm`);

const frame = require("../constructs/frame");
const {
  //cardOuterGeometry,
  pins
  //supportHoles
} = require("../constructs/card-outer");

//const tabSize = frame.width + Math.min(palm.face.y, palm.face.y2);
const tabSize = (frame.width + mm(1)) * 2;

const faceTopLeft = path.rect({
  width: tabSize,
  height: tabSize,
  radius: tabSize //cardOuterGeometry.radius
});

const face = faceTopLeft;

const part = pipe(
  ...pins().map(subtract)
  //...supportHoles().map(subtract)
)(face);

module.exports = () => part.clone();
