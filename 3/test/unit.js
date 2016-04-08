var brancher = require('../brancher.js');
var assert = require('assertthat');

describe('Brancher', function () {
  it('should work on trivial test', function () {
    var input = [
      {id: 1, parentId: 0}
    ];

    var output = [
      {id: 1, parentId: 0}
    ];

    assert.that(brancher(input)).is.equalTo(output);
  });

  it('should work on vendor\'s test', function () {
    var input = [
      {id: 1, parentId: 0},
      {id: 2, parentId: 0},
      {id: 3, parentId: 1},
      {id: 4, parentId: 1},
      {id: 5, parentId: 2},
      {id: 6, parentId: 4},
      {id: 7, parentId: 5}
    ];

    var output = [
      {
        id: 1,
        parentId: 0,
        children: [
          {
            id: 3,
            parentId: 1
          },
          {
            id: 4,
            parentId: 1,
            children: [
              {
                id: 6,
                parentId: 4
              }
            ]
          }
        ]
      },
      {
        id: 2,
        parentId: 0,
        children: [
          {
            id: 5,
            parentId: 2,
            children: [
              {
                id: 7,
                parentId: 5
              }
            ]
          }
        ]
      }
    ];

    assert.that(brancher(input)).is.equalTo(output);
  });

  it('should work on flatten test', function () {
    var input = [
      {id: 1, parentId: 0},
      {id: 2, parentId: 1},
      {id: 3, parentId: 1},
      {id: 4, parentId: 1},
      {id: 5, parentId: 1},
      {id: 6, parentId: 1},
      {id: 7, parentId: 1}
    ];

    var output = [
      {
        id: 1,
        parentId: 0,
        children: [
          {
            id: 2,
            parentId: 1
          },
          {
            id: 3,
            parentId: 1
          },
          {
            id: 4,
            parentId: 1
          },
          {
            id: 5,
            parentId: 1
          },
          {
            id: 6,
            parentId: 1
          },
          {
            id: 7,
            parentId: 1
          }
        ]
      }
    ];

    assert.that(brancher(input)).is.equalTo(output);
  });

  it('should work on nested test', function () {
    var input = [
      {id: 1, parentId: 0},
      {id: 2, parentId: 1},
      {id: 3, parentId: 2},
      {id: 4, parentId: 3},
      {id: 5, parentId: 4},
      {id: 6, parentId: 5},
      {id: 7, parentId: 6}
    ];

    var output = [
      {
        id: 1,
        parentId: 0,
        children: [
          {
            id: 2,
            parentId: 1,
            children: [
              {
                id: 3,
                parentId: 2,
                children: [
                  {
                    id: 4,
                    parentId: 3,
                    children: [
                      {
                        id: 5,
                        parentId: 4,
                        children: [
                          {
                            id: 6,
                            parentId: 5,
                            children: [
                              {
                                id: 7,
                                parentId: 6
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    assert.that(brancher(input)).is.equalTo(output);
  });
});