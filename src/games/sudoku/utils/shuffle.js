// Adapted from: https://www.tutorialspoint.com/what-is-fisher-yates-shuffle-in-javascript
export function shuffle(array) {
  let i = array.length;
  while (--i > 0) {
    let temp = Math.floor(Math.random() * (i + 1));
    [array[temp], array[i]] = [array[i], array[temp]];
  }
  return array;
}
