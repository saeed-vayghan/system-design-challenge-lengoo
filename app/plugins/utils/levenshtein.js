/*
  Intro:
  The Levenshtein distance is the minimum number of single-character edits(add/insert, change/substitution, delete/remove) required to change one word into the other;

  Examples:
    The Levenshtein distance between "foo” and "bar” is 3
    The Levenshtein distance between "beauties” and "beautiful” is also 3
    The Levenshtein distance between "fast” and "faster” is also 2
    The Levenshtein distance between "meilenstein and "levenshtein is also 4
*/


/**
 * @param  {String} a
 * @param  {String} b
 * 
 * @typedef {Object} Distance
 * @property {number[][]} matrix The matrix
 * @property {Number} distance The distance
 * 
 * @return {Distance} The location of the event
 */
const levenshteinDistance = (a, b) => {
  const lengthA = a.length;
  const lengthB = b.length;

  if ( lengthA === 0 ) {
    return {
      matrix: [],
      distance: lengthB
    };
  }

  if ( lengthB === 0 ) {
    return {
      matrix: [],
      distance: lengthA
    };
  }


  /*
  We want to visualize the initial version of our matrix:
  For a given input(a) that it's length is 4
  For a given input(b) that it's length is 6

  matrix [
    [ 0, 1, 2, 3, 4 ],
    [ 1, *, *, *, * ],
    [ 2, *, *, *, * ],
    [ 3, *, *, *, * ],
    [ 4, *, *, *, * ],
    [ 5, *, *, *, * ],
    [ 6, *, *, *, * ]
  ]
  */

  // Initializing the matrix
  const matrix = [];

  for (let i = 0; i <= lengthB; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= lengthA; j++) {
    matrix[0][j] = j;
  }


  // Filling the matrix
  for (let i = 1; i <= lengthB; i++) {
      for (let j = 1; j <= lengthA; j++) {

        if ( b.charAt(i-1) === a.charAt(j-1 ) ) {
          matrix[i][j] = matrix[i-1][j-1];

        } else {

          matrix[i][j] = Math.min(
            matrix[i-1][j-1] + 1,
            Math.min(matrix[i][j-1] + 1,
            matrix[i-1][j] + 1)
          );
        }
      }
  }


  return {
    matrix,
    distance: matrix[lengthB][lengthA]
  }
};


module.exports = levenshteinDistance