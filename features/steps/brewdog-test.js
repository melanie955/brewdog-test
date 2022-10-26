const { Given, When, Then } = require("@cucumber/cucumber");
const pactum = require("pactum");
const assert = require("assert");

let spec = pactum.spec();
var response;
var malt;

Given('I call the punk api with beer id 192', async function () {
    response = await spec.get("https://api.punkapi.com/v2/beers/192");
});

Then('I expect a 200 status response', () => {
    spec.response().should.have.status(200);
});

Then('The malt is “Extra Pale”', () => {
    malt = response.json[0].ingredients.malt[0];
    assert.strictEqual(malt.name, 'Extra Pale');
});

Then('The malt value is 5.3 and the unit is “kilograms”', () => {
    assert.strictEqual(malt.amount.value, 5.3);
    assert.strictEqual(malt.amount.unit, 'kilograms');
});