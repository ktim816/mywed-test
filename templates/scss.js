module.exports = blockName => `
.${blockName} {
  display: block;

  $this: &;
}

`;
