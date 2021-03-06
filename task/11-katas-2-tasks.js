
/**
 * Returns the bank account number parsed from specified string.
 *
 * You work for a bank, which has recently purchased an ingenious machine to assist
 * in reading letters and faxes sent in by branch offices.
 * The machine scans the paper documents, and produces a string with a bank account
 * that looks like this:
 *
 *    _  _     _  _  _  _  _
 *  | _| _||_||_ |_   ||_||_|
 *  ||_  _|  | _||_|  ||_| _|
 *
 * Each string contains an account number written using pipes and underscores.
 * Each account number should have 9 digits, all of which should be in the range 0-9.
 *
 * Your task is to write a function that can take bank account string and parse it
 * into actual account numbers.
 *
 * @param {string} bankAccount
 * @return {number}
 *
 * Example of return :
 *
 *   '    _  _     _  _  _  _  _ \n'+
 *   '  | _| _||_||_ |_   ||_||_|\n'+     =>  123456789
 *   '  ||_  _|  | _||_|  ||_| _|\n'
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '| | _| _|| ||_ |_   ||_||_|\n'+     => 23056789
 *   '|_||_  _||_| _||_|  ||_| _|\n',
 *
 *   ' _  _  _  _  _  _  _  _  _ \n'+
 *   '|_| _| _||_||_ |_ |_||_||_|\n'+     => 823856989
 *   '|_||_  _||_| _||_| _||_| _|\n',
 *
 */
export function parseBankAccount(bankAccount) {
  let str = '';
  let res = '';
  let tmp = [];
  let number = bankAccount.split('\n');
  number = number.map(
    function(el, i) {
      return el.split('');
    }
  );
  let numbers = ['246789', '69', '25678', '25689', '4569', '24589', '245789', '269', '2456789', '245689'];
  number.map(
    function(el, i, arr) {
      if (i === 0) {
        el.map(
          function(e, j, ar) {
            if (j % 3 === 0) {
              tmp.push(ar[j]);
              tmp.push(ar[j+1]);
              tmp.push(ar[j+2]);
              tmp.push(arr[i+1][j]);
              tmp.push(arr[i+1][j+1]);
              tmp.push(arr[i+1][j+2]);
              tmp.push(arr[i+2][j]);
              tmp.push(arr[i+2][j+1]);
              tmp.push(arr[i+2][j+2]);
              tmp.map(
                function(zz, y) {
                  if (zz ==='_' || zz === '|') {
                    str += '' + (y+1);
                  }

                }
              );
              res += '' + numbers.indexOf(str);
              tmp = [];
              str = '';
            }


          }
        );
      }
    }
  );
  return res;
  /* implement your code here */
  //throw new Error('Not implemented');
}
/**
 * Returns the string, but with line breaks inserted at just the right places to make
 * sure that no line is longer than the specified column number.
 * Lines can be broken at word boundaries only.
 *
 * @param {string} text
 * @param {number} columns
 * @return {Iterable.<string>}
 *
 * @example :
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 26 =>
 *      'The String global object',
 *      'is a constructor for',
 *      'strings, or a sequence of',
 *      'characters.'
 *
 *  'The String global object is a constructor for strings, or a sequence of characters.', 12 =>
 *      'The String',
 *      'global',
 *      'object is a',
 *      'constructor',
 *      'for strings,',
 *      'or a',
 *      'sequence of',
 *      'characters.'
 */
export function* wrapText(text, columns) {
  let arr = text.split(' ');
  let temp = [];
  let j = 0;
  while (j < arr.length) {
    if(temp.join(' ').length + arr[j].length < columns) {
      temp.push(arr[j]);
      j++;
    } else {
      yield temp.join(' ');
      temp = [];
    }
  }
  yield temp.join(' ');
  /* implement your code here */
  //throw new Error('Not implemented');
}

/**
 * Returns the rank of the specified poker hand.
 * See the ranking rules here: https://en.wikipedia.org/wiki/List_of_poker_hands.
 *
 * @param {array} hand
 * @return {PokerRank} rank
 *
 * @example
 *   [ '4♥','5♥','6♥','7♥','8♥' ] => PokerRank.StraightFlush
 *   [ 'A♠','4♠','3♠','5♠','2♠' ] => PokerRank.StraightFlush
 *   [ '4♣','4♦','4♥','4♠','10♥' ] => PokerRank.FourOfKind
 *   [ '4♣','4♦','5♦','5♠','5♥' ] => PokerRank.FullHouse
 *   [ '4♣','5♣','6♣','7♣','Q♣' ] => PokerRank.Flush
 *   [ '2♠','3♥','4♥','5♥','6♥' ] => PokerRank.Straight
 *   [ '2♥','4♦','5♥','A♦','3♠' ] => PokerRank.Straight
 *   [ '2♥','2♠','2♦','7♥','A♥' ] => PokerRank.ThreeOfKind
 *   [ '2♥','4♦','4♥','A♦','A♠' ] => PokerRank.TwoPairs
 *   [ '3♥','4♥','10♥','3♦','A♠' ] => PokerRank.OnePair
 *   [ 'A♥','K♥','Q♥','2♦','3♠' ] =>  PokerRank.HighCard
 */
export const PokerRank = {
  StraightFlush: 8,
  FourOfKind: 7,
  FullHouse: 6,
  Flush: 5,
  Straight: 4,
  ThreeOfKind: 3,
  TwoPairs: 2,
  OnePair: 1,
  HighCard: 0
};

export function getPokerHandRank(hand) {
  function get(hand) {
    const _ranks = 'A234567891JQKA',
      suits = [],
      ranks = {
        count: [],
        values: [],
        sorted: []
      };

    for (let v of hand) {
      if (ranks.values.indexOf(v[0]) < 0) {
        ranks.values.push(v[0]);
        ranks.count.push(1);
      } else ranks.count[ranks.values.indexOf(v[0])]++;

      if (suits.indexOf(v.slice(-1)) < 0) suits.push(v.slice(-1));
    }
    ranks.sorted = ranks.values.sort(
      (a, b) => _ranks.indexOf(a) - _ranks.indexOf(b)
    );
    if (ranks.sorted[0] === 'A' && ranks.sorted[1] !== '2') {
      ranks.sorted.splice(0, 1);
      ranks.sorted.push('A');
    }

    this.getCount = function(cnt) {
      let res = 0;
      for (let v of ranks.count) if (v === cnt) res++;
      return res;
    };

    this.isFlush = function() {
      return suits.length === 1;
    };

    this.isStraight = function() {
      if (ranks.sorted.length < 5) return false;
      for (let i = 1; i < 5; i++) {
        if (
          _ranks.indexOf(ranks.sorted[i - 1]) + 1 !==
            _ranks.indexOf(ranks.sorted[i]) &&
          _ranks.indexOf(ranks.sorted[i - 1]) + 1 !==
            _ranks.lastIndexOf(ranks.sorted[i])
        ) {
          return false;
        }
      }
      return true;
    };
  }

  hand = new get(hand);

  if (hand.isFlush() && hand.isStraight()) return PokerRank.StraightFlush;
  else if (hand.getCount(4)) return PokerRank.FourOfKind;
  else if (hand.getCount(3) && hand.getCount(2)) return PokerRank.FullHouse;
  else if (hand.isFlush()) return PokerRank.Flush;
  else if (hand.isStraight()) return PokerRank.Straight;
  else if (hand.getCount(3)) return PokerRank.ThreeOfKind;
  else if (hand.getCount(2) === 2) return PokerRank.TwoPairs;
  else if (hand.getCount(2)) return PokerRank.OnePair;
  else return PokerRank.HighCard;
}

/**
 * Returns the rectangles sequence of specified figure.
 * The figure is ASCII multiline string comprised of minus signs -, plus signs +,
 * vertical bars | and whitespaces.
 * The task is to break the figure in the rectangles it is made of.
 *
 * NOTE: The order of rectanles does not matter.
 *
 * @param {string} figure
 * @return {Iterable.<string>} decomposition to basic parts
 *
 * @example
 *
 *    '+------------+\n'+
 *    '|            |\n'+
 *    '|            |\n'+        '+------------+\n'+
 *    '|            |\n'+        '|            |\n'+         '+------+\n'+          '+-----+\n'+
 *    '+------+-----+\n'+   =>   '|            |\n'+     ,   '|      |\n'+     ,    '|     |\n'+
 *    '|      |     |\n'+        '|            |\n'+         '|      |\n'+          '|     |\n'+
 *    '|      |     |\n'         '+------------+\n'          '+------+\n'           '+-----+\n'
 *    '+------+-----+\n'
 *
 *
 *
 *    '   +-----+     \n'+
 *    '   |     |     \n'+                                    '+-------------+\n'+
 *    '+--+-----+----+\n'+              '+-----+\n'+          '|             |\n'+
 *    '|             |\n'+      =>      '|     |\n'+     ,    '|             |\n'+
 *    '|             |\n'+              '+-----+\n'           '+-------------+\n'
 *    '+-------------+\n'
 */
export function* getFigureRectangles(figure) {
  figure = figure.split('\n');

  function myLoop(row, col, dRow, dCol, s) {
    let i;
    if (dRow) {
      for (i = row + dRow; i < figure.length && i >= 0; i += dRow) {
        if (
          figure[i][col] === '+' &&
           (figure[i][col - dRow] === '+' || figure[i][col - dRow] === s)
        ) {
          return i;
        } else if (figure[i][col] === ' ') return false;
      }
    }
    if (dCol && figure[row + dCol]) {
      for (i = col + dCol; i < figure[row].length && i >= 0; i += dCol) {
        if (
          figure[row][i] === '+' &&
           (figure[row + dCol][i] === '+' || figure[row + dCol][i] === s)
        ) {
          return i;
        } else if (figure[row][i] === ' ') return false;
      }
    }
    return false;
  }

  function rec(row, col) {
    let _col, _row, resultCol, resultRow;

    _col = myLoop(row, col, 0, 1, '|');
    if (_col === false) return false;
    _row = myLoop(row, _col, 1, 0, '-');
    if (_row === false) return false;
    resultCol = _col;
    resultRow = _row;

    _col = myLoop(_row, _col, 0, -1, '|');
    if (_col === false) return false;
    _row = myLoop(_row, _col, -1, 0, '-');
    if (_row === false) return false;

    if (_row === row && _col === col) {
      return {
        width: resultCol - col + 1,
        height: resultRow - row + 1
      };
    } else return false;
  }

  function getFigure(obj) {
    var line = '+' + '-'.repeat(obj.width - 2) + '+\n',
      result = line;
    result += ('|' + ' '.repeat(obj.width - 2) + '|\n').repeat(obj.height - 2);
    return result + line;
  }

  for (let i = 0; i < figure.length; i++) {
    for (let j = 0; j < figure[i].length; j++) {
      if (
        figure[i][j] === '+' &&
         figure[i + 1] &&
         (figure[i + 1][j] === '|' || figure[i + 1][j] === '+') &&
         (figure[i][j + 1] === '-' || figure[i][j + 1] === '+')
      ) {
        let obj = rec(i, j);
        if (obj) yield getFigure(obj);
      }
    }
  }
}
