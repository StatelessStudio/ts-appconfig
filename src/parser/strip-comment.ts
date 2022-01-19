/**
 * Strip comment from an .env line
 *
 * @param line Line
 * @return Returns the stripped line
 */
export function stripComment(line: string): string {
	let isQuoted = false;
	let quotedChar = null;
	let isEscaped = false;
	let newEndIndex = 0;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];

		if (!isEscaped && char === '\\') {
			isEscaped = true;

			continue;
		}

		if (!isEscaped && (char === '"' || char === '\'')) {
			if (isQuoted) {
				if (char === quotedChar) {
					isQuoted = false;
				}
			}
			else {
				quotedChar = char;
				isQuoted = true;
			}

			continue;
		}

		if (!isQuoted && !isEscaped && char === '#') {
			newEndIndex = i;

			break;
		}

		isEscaped = false;
	}

	if (newEndIndex) {
		line = line.substring(0, newEndIndex).trim();
	}

	return line;
}
