const root = require("app-root-path");
const paper = require("paper-jsdom");

const { layoutRowsWithOffset } = require(`${root}/distribution`);
const { cut, guide } = require(`${root}/stroke`);
const { nItems } = require(`${root}/fn`);
const group = require(`${root}/group`);
//const { inches } = require(`${root}/units`);
//const path = require(`${root}/path`);

const topBase = require("./parts/top-base");
const ring = require("./parts/top-ring");
const ringJointPin = require("./parts/ring-joint-pin");

const { T, ringT } = require("./parameters.js");

layoutRowsWithOffset(
  [
    // top base
    [topBase()].map(cut),

    // top support
    [ring()].map(guide),

    [ringJointPin()].map(guide),

    [
      group(
        nItems(4)
          .map(ring)
          .map((p, i) => p.translate(i * (ringT + T)))
          .map(cut)
      )
    ],
    nItems(12)
      .map(ringJointPin)
      .map(cut)

    // bottom base
    //[
    //  path.rect({
    //    width: inches(11),
    //    height: inches(11),
    //    radius: inches(0.25)
    //  })
    //].map(cut)
  ],
  T
);

paper.view.viewSize = [9999, 9999];
