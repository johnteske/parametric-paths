const root = require("app-root-path");

const path = require(`${root}/path`);
const { inches } = require(`${root}/units`);
const { unite, subtract } = require(`${root}/boolean`);
const { pipe } = require(`${root}/fn`);

const { widthSide } = require("../constructs/panels");
const {
  widthLengthFingers,
  bottomWidthFingers
} = require("../constructs/joints");
const { T } = require("../material");

const widthSidePart = pipe(
  // side fingers
  ...widthLengthFingers().map(unite),
  ...widthLengthFingers()
    .map(f => f.translate([inches(2.5) + T, 0]))
    .map(unite),
  // bottom fingers
  unite(
    path.rect({
      width: inches(2.5),
      height: T,
      y: inches(1.25)
    })
  ),
  ...bottomWidthFingers()
    .map(f => f.translate([0, inches(1.25)]))
    .map(subtract)
)(widthSide());

module.exports = () => widthSidePart.clone();
