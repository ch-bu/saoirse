import Url from 'url-parse';
import queryString from 'query-string';

function filterMarkdownFiles(data, location) {
  // Get url parameters
  const url = new Url(location.href);
  const parsedURL = queryString.parse(url.query);

  // Make sure that the url has all necessary parameters
  if (parsedURL.id && parsedURL.subunit && parsedURL.unit) {
    // Filter all markdown files by module_id
    const markdownSubunits = data.filter((value, index, array) => {
      return value.node.frontmatter.module == parsedURL.id;
    });

    // Get current page
    const markdownCurrent = markdownSubunits.filter((value) => {
      return value.node.frontmatter.subunit == parsedURL.subunit &&
            value.node.frontmatter.unit     == parsedURL.unit;
    })[0].node;

    // Get start pages for each unit
    const startMarkdown = data.filter((value) => {
      return value.node.frontmatter.subunit == 0 &&
             value.node.frontmatter.unit == 0;
    });

    return [markdownSubunits, markdownCurrent, 
            startMarkdown, markdownSubunits[0]];
  }
}

export default filterMarkdownFiles;
