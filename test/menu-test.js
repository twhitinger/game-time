const chai = require("chai");
const assert = chai.assert;

const Menu = require('../lib/menu');

describe("Main Menu", function() {
  context("can accept inputs", function() {
    xit("has a listen function", function() {
      let menu = new Menu();
      assert.isFunction(menu.listen, "listen is not a function on menu");
    });
  });

  context("with localStorage of scores", function() {
    xit("fetches scores if available", function() {
      localStorage.lygerWoodsHighScores = "72 81 70 68";
      localStorage.lygerWoodsLastScore = "68";
      let menu = new Menu();
      let expected = "Past Scores: 72 81 70 68";
      assert.equal(menu.highScores, expected, "high scores not listed as expected");
    });
  });
});
