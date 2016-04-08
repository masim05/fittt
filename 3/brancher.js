module.exports = function (_input) {
  var i, l;
  var hash = {},
  // Do not modify _input
    input = JSON.parse(JSON.stringify(_input));

  for (i = 0, l = input.length; i < l; i++) {
    hash[input[i].id] = i;
  }

  var parent;
  for (i = input.length; i-- > 0;) {
    // Do nothing on top level nodes
    if (!input[i].parentId) {
      continue;
    }

    parent = input[hash[input[i].parentId]];
    if (!parent.children) {
      parent.children = [];
    }
    parent.children.unshift(input[i]);
    input[i] = undefined;
  }

  // Prepare output
  var output = [];
  for (i = 0, l = input.length; i < l; i++) {
    if (input[i]) {
      output.push(input[i]);
    }
  }

  return output;
};