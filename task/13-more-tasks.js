/**
 * Takes two strings including only letters from a to z.
 * Returns a new sorted string containing distinct letters.
 *
 * @param {string} value1
 * @param {string} value2
 * @return {string}
 *
 * @example
 *   'azy', 'bk' => 'abkyz'
 *   'zxxlal','laxk'    => 'aklxz'
 *   'abcdefghijklmnop',  'lmnopqrstuvwxyz'  => 'abcdefghijklmnopqrstuvwxyz'
 */
export function distinctLettersString(value1, value2) {
  let str = value1 + value2;
  const sortStr = str.split('').sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  const set = new Set(sortStr);
  return [...set].join('');
}



/**
 * Takes a string with any characters.
 * Returns an object containing appearence of every distinct letters in lower case.
 *
 * @param {string} value
 * @return {Object}
 *
 * @example
 *  'Who you are, Buddy?' => { a:1, d:2, e:1, h:1, o:2, r:1, u:2, y:2 }
 *
 */

export function lowerLetters(value) {
  const arr = value.split('').sort();
  let result = [];
  arr.forEach(el => {
    if (el.charCodeAt() >= 97 && el.charCodeAt() <= 122) {
      result = [...result, el];
    }
  });
  return result.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});
}


/**
 * Write a function that will convert a string into title case, given an optional
 * list of exception (minor words). The list of minor words will be given as a
 * string with each word separated by a space. Your function should ignore the
 * case of the minor words string - it should behave in the same way even if the
 * case of the minor word is changed
 *
 * @param {string} the original string to be converted
 * @param {string} list of minor words that must always be lowercase except for
 *                  the first word in the string
 * @return {string}
 *
 * @example
 *    'a clash if KINGS', 'a an the of'  =>  'A Clash of Kings'
 *    'THE WIND IN THE WILLOWS', 'The In'  => 'The Wind in the Willows'
 *    'the quick brown fox'  => 'The Quick Brown Fox'
 */

export function titleCaseConvert(title, minorWords) {
  var answer = [];
  if (minorWords) {
    minorWords = minorWords.toLowerCase();
  } else {
    minorWords = '';
  }
  title = title.toLowerCase().split(' ');

  title.forEach(function(word, index, array) {
    if (index === 0) {
      answer.push(capitalizeFirst(word));
    } else if (minorWords.indexOf(word) !== -1) {
      answer.push(word);
    } else {
      answer.push(capitalizeFirst(word));
    }
  });

  function capitalizeFirst(arg) {
    arg = arg.split('');
    arg[0] = arg[0].toUpperCase();
    arg = arg.join('');
    return arg;
  }

  return answer.join(' ');
}


/**
 * Your job is to create a calculator which evaluates expressions in Reverse Polish
 * notation (https://en.wikipedia.org/wiki/Reverse_Polish_notation). Empty expression
 * should evaluate to 0. Expression without operation returns the last number.
 *
 * @param {string} RPN string, each number and operation separated by a space
 *
 * @return {Number}
 *
 * @example
 *  ''  =>  0  // empty expression returns 0
 *  '1 2 3'  =>  3  // expression without operation returns the last number
 *  '4 2 +'  =>  6  // 4 + 2
 *  '2 5 * 2 + 3 /'  =>  4   //  ((5 * 2) + 2) / 3
 *  '5 1 2 + 4 * + 3 -'  =>  14   // 5 + ((1 + 2) * 4) -3
 */

export function calcRPN(expr) {
  let stack = expr.split(' ');

  for (let i = 0; i < stack.length; ) {
    let val = stack[i];

    if (val === '+') {
      stack.splice(i - 2, 3, +stack[i - 2] + +stack[i - 1]);
      i -= 2;
    } else if (val === '-') {
      stack.splice(i - 2, 3, +stack[i - 2] - +stack[i - 1]);
      i -= 2;
    } else if (val === '*') {
      stack.splice(i - 2, 3, +stack[i - 2] * +stack[i - 1]);
      i -= 2;
    } else if (val === '/') {
      stack.splice(i - 2, 3, +stack[i - 2] / +stack[i - 1]);
      i -= 2;
    }
    i++;
  }

  return stack[stack.length - 1];
}
