/**
 * Converts a NodeList into a true Array so you can use prototype functions like forEach and filter
 * @param {NodeList} nodeList The HTML NodeList to call this method on
 * @returns An Array instance that contains the children of the NodeList
 */ 
export function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList)
}