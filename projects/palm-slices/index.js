const paper = require("paper-jsdom");

const path = require("../../path");
const { cut } = require("../../stroke");
const { inches, mm } = require("../../units");

const palm = require("./palm");
const cards = require("./cards");

const T = inches(1 / 8); // thickness of main body material
// const T2 = // thickness of faceplate material
const cornerRadius = mm(3);

const primitives = new paper.Group({ insert: false });

const pin = { d: mm(3) };
pin.r = pin.d / 2;
pin.h = T + pin.d + T; // total pin height, incl. padding

const palmPocket = new paper.Rectangle({
  width: palm.d1,
  height: palm.h,
  x: T,
  y: pin.h
});
cut(path.rect({ ...palmPocket, radius: cornerRadius }));

//const palmCameraCutout = new paper.Rectangle({
//  width: T,
//  height: palm.camera.h
//});
//palmCameraCutout.x = palmPocket.topRight.x;
//palmCameraCutout.y = palmPocket.topRight.y + palm.camera.offset;
//cut(path.rect(palmCameraCutout, 0));

const rect = new paper.Rectangle({
  width: T + palm.d1 + T + cards.T,
  height: pin.h + palmPocket.height + pin.h
});
const rect2 = path.rect({ ...rect, radius: cornerRadius, parent: primitives });

const cardPocket = new paper.Rectangle({
  width: cards.T,
  height: cards.h,
  x: rect.width - cards.T,
  y: (rect.height - cards.h) / 2
});
const cardPocket2 = path.rect({ ...cardPocket, radius: 0, parent: primitives });

const outerWithPocket = rect2.subtract(cardPocket2);
outerWithPocket.parent = paper.project.activeLayer;
cut(outerWithPocket);

const holeAt = center => new paper.Path.Circle({ center, radius: pin.r });
const holes = new paper.Group(
  [[rect.width / 2, T + pin.r], [rect.width / 2, rect.height - T - pin.r]].map(
    xy => holeAt(xy)
  )
);
cut(holes);