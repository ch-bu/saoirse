import Url from 'url-parse';
import queryString from 'query-string';

function NextPrevious(subunits, location) {
  // Get url parameters
  const url = new Url(location.href);
  const parsedURL = queryString.parse(url.query);

  // Get current page
  const markdownCurrent = subunits.filter((value, index, array) => {
    return value.node.frontmatter.subunit == parsedURL.subunit &&
          value.node.frontmatter.unit     == parsedURL.unit;
  })[0].node;

  const current_index = subunits.findIndex((value, index) => {
    return value.node.frontmatter.subunit == parsedURL.subunit &&
          value.node.frontmatter.unit     == parsedURL.unit;
  });

  // Get subunit after current subunit
  const markdownNext = subunits.filter((value, index) => {
    return index === current_index + 1 &&
           value.node.frontmatter.unit == markdownCurrent.frontmatter.unit;
  });

  // Get subunit before current subunit
  const markdownPrevious = subunits.filter((value, index) => {
    return index == current_index - 1 &&
           value.node.frontmatter.unit == markdownCurrent.frontmatter.unit;
  });

  return [markdownPrevious.length === 0 ? undefined : markdownPrevious[0].node, 
          markdownCurrent, 
          markdownNext.length     === 0 ? undefined : markdownNext[0].node];

}

export default NextPrevious;
