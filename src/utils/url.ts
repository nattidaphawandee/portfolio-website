// NOTE เป็น Function สำหรับการ Append query string parameters to URL
export function addQueryString(url: string, query: any) {
  // TODO Parse the input URL
  const parsedUrl = new URL(url);

  // TODO Iterate over the JSON data and append each key-value pair to the query string
  for (const key of Object.keys(query)) {
    parsedUrl.searchParams.append(key, query[key]);
  }

  // TODO Return the new URL with the appended query string
  return parsedUrl.toString();
}