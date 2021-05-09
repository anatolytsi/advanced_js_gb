const stringTest = `'Watermelons aren't fruits'`;
let regexp = /(?!\b\w*'\w*\b)'/gi;
console.log(stringTest.replace(regexp, '"'));
