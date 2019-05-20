import Url from 'url-parse';
import queryString from 'query-string';

function NextPrevious(subunits, location) {
  // Get url parameters
  const url = new Url(location.href);
  const parsedURL = queryString.parse(url.query);
  let markdownNext = undefined;
  let markdownPrevious = undefined;
  let markdownCurrentSubunits = undefined;
  let markdownCurrent = undefined;

  if (subunits) {
    // Get current page
    markdownCurrent = subunits.filter((value, index, array) => {
      return value.node.frontmatter.subunit == parsedURL.subunit &&
            value.node.frontmatter.unit     == parsedURL.unit;
    });

    if (markdownCurrent.length != 0) {
      markdownCurrent = markdownCurrent[0].node;

      const current_index = subunits.findIndex((value, index) => {
        return value.node.frontmatter.subunit == parsedURL.subunit &&
              value.node.frontmatter.unit     == parsedURL.unit;
      });

      // Get subunit after current subunit
      markdownNext = subunits.filter((value, index) => {
        return index === current_index + 1 &&
              value.node.frontmatter.unit == markdownCurrent.frontmatter.unit;
      });
    
      // Get markdown files for current subunit
      markdownCurrentSubunits = subunits.filter((value, index, array) => {
        return value.node.frontmatter.module == parsedURL.id &&
              value.node.frontmatter.unit == parsedURL.unit;
      });
    
      // Get subunit before current subunit
      markdownPrevious = subunits.filter((value, index) => {
        return index == current_index - 1 &&
              value.node.frontmatter.unit == markdownCurrent.frontmatter.unit;
      });
    }
  }

  return [markdownPrevious ? (markdownPrevious.length !== 0 ? markdownPrevious[0].node : undefined) : undefined, 
          markdownCurrent  ? markdownCurrent : undefined, 
          markdownNext ? (markdownNext.length !== 0 ? markdownNext[0].node : undefined) : undefined,
          markdownCurrentSubunits ? markdownCurrentSubunits : undefined];

}

export default NextPrevious;
