const sharp = require("sharp");

const crop = (input) => {
  return sharp(input).resize(300, 240, {
    fit: sharp.fit.cover,
  });
};
