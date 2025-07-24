export function truncateText(text: string, maxLength: number = 20, suffix: string = '...'): string {
  // Ensure the input is a string (TypeScript already enforces this with type annotations)

  text = `${text}`;

  // Return the original text if it's within the max length
  if (text.length <= maxLength) {
    return text;
  }

  // Return the truncated text with suffix
  return `${text.substring(0, maxLength)}${suffix}`;
}

export function Matrix(number: any, decPlaces = 2): string {
  // 2 decimal places => 100, 3 => 1000, etc
  decPlaces = Math.pow(10, decPlaces);
  // Enumerate number abbreviations
  const abbrev = ['K', 'M', 'B', 'T'];
  // Go through the array backwards, so we do the largest first
  for (let i = abbrev.length - 1; i >= 0; i--) {
    // Convert array index to "1000", "1000000", etc
    const size = Math.pow(10, (i + 1) * 3);
    // If the number is bigger or equal do the abbreviation
    if (size <= number) {
      // Here, we multiply by decPlaces, round, and then divide by decPlaces.
      // This gives us nice rounding to a particular decimal place.
      number = Math.round((number * decPlaces) / size) / decPlaces;
      // Handle special case where we round up to the next abbreviation
      if (number === 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }
      // Add the letter for the abbreviation
      number += ' ' + abbrev[i];
      // We are done... stop
      break;
    }
  }
  return number;
}

// TODO เป็น function ในการ แปลงข้อมูลเป็น Byte
// TODO REF https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascriptP
export function Bytes(bytes: number, decimals = 2): string {
  if (!+bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
