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

    // Filter all markdown files by module_id
    const markdownStarters = markdownSubunits.filter((value) => {
      return value.node.frontmatter.module == parsedURL.id &&
             value.node.frontmatter.subunit == 0;
    });

    // Get markdown files for current subunit
    const markdownCurrentSubunits = data.filter((value, index, array) => {
      return value.node.frontmatter.module == parsedURL.id &&
             value.node.frontmatter.unit == parsedURL.unit;
    });

    // Get start pages for each unit
    const markdownFirst = data.filter((value) => {
      return value.node.frontmatter.subunit == 0 &&
             value.node.frontmatter.unit == 0;
    });

    return [markdownSubunits, markdownFirst, markdownCurrentSubunits,
            markdownStarters];
  }
}

export default filterMarkdownFiles;
