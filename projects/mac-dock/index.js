const root = require("app-root-path");

const paper = require("paper-jsdom");

//const path = require(`${root}/path`);
//const withRoundedCorner = require("../../rounded-corner");
const { cut, guide } = require(`${root}/stroke`);
const { inches, mm } = require(`${root}/units`);

const group = (...args) => new paper.Group(...args);
//const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

//const T = inches(1 / 8); // thickness of main body material

const { back, bottom, side } = require("./mac-tray");
const { magSafeCutout } = require("./mag-safe");
const { multiportCutout } = require("./av-multiport");

const guides = [
  group(magSafeCutout(), back(), bottom()),
  group(multiportCutout(), back(), bottom()),
  group(back(), side())
  //group(back(), bottom()), // TODO needs cutouts for cables to pass through
];
guides.forEach((g, i) => guide(g).translate([0, i * mm(90)]));

const cuts = [
  back()
    .unite(bottom())
    .subtract(magSafeCutout()),
  back()
    .unite(bottom())
    .subtract(multiportCutout()),
  back().unite(side())
];
cuts.forEach((g, i) => cut(g).translate([mm(90), i * mm(90)]));

paper.view.viewSize = [666, 2000];
