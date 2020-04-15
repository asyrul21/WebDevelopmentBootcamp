var fake = require('faker');

console.log('FAKER!');

for(var i = 0; i < 10; i++){
    console.log(`${fake.commerce.productAdjective()} ${fake.commerce.productMaterial()} ${fake.commerce.product()} - ${fake.commerce.price()}`);
    // console.log(fake.commerce.productAdjective());
    // console.log(faker.fake("{{name.lastName}}, {{name.firstName}} {{name.suffix}}"));

}