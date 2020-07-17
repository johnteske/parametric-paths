const root = require("app-root-path");

const path = require(`${root}/path`);
const { cut } = require(`${root}/stroke`);
const { inches } = require(`${root}/units`);
const { layoutRowsWithOffset } = require(`${root}/distribution`);

// 1/4" cast acrylic
// https://www.mcmaster.com/8560K354/
const frameT = inches(0.5);

// pin
// https://www.mcmaster.com/92373A181/
const d = inches(1 / 8);
const pinOffset = frameT / 2;
const part_hole = path.circle({
  radius: d / 2
});

const inner = {
  width: inches(6),
  height: inches(4),
  x: frameT,
  y: frameT
};

const outer = {
  width: frameT + inner.width + frameT,
  height: frameT + inner.height + frameT,
  radius: d / 2
};

const part_outer = path
  .rect(outer)
  .subtract(part_hole.clone().translate(pinOffset))
  .subtract(part_hole.clone().translate(outer.width - pinOffset, pinOffset))
  .subtract(part_hole.clone().translate(pinOffset, outer.height - pinOffset))
  .subtract(
    part_hole
      .clone()
      .translate(outer.width - pinOffset, outer.height - pinOffset)
  );

const part_inner = part_outer
  .clone()
  .subtract(path.rect(inner))
  .subtract(path.rect(inner).translate(0, -frameT)); // allow space to insert frame

layoutRowsWithOffset(
  [[part_outer.clone(), part_inner.clone(), part_outer.clone()].map(cut)],
  10
);
