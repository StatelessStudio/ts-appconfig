/**
 * This error is thrown when two variables reference eachother in a way that
 * 	would create an endless loop
 */
export class CircularReferenceError extends Error {
}
