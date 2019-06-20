---
moduleTitle: About
unitTitle: Saoirse
title: Common problems
module: 0
unit: 0
subunit: 3
type: information
---

## The markdown files do not update when I am developing the course

Sometimes after you have fired up the application with `gatsby develop` and change your markdown files, you do not see these changes immediately. First, try to reload by page by **Strg+F5**. If that doesn't work, restart Gatsby: **Strg+c** in your terminal and then `gatsby develop`. You should then see the current state of your markdown files.

## There are some markdown files missing in the application

Probably, there is a small glitch in the indexes of your module, unit or subunit. Try to double-check for duplicates in the frontmatter of your markdown files. 

```
---
moduleTitle: About
module: 0
unitTitle: Saoirse
unit: 0
title: How does it work?
subunit: 1
type: question
---
```

As a general rule: 

* Start each unit, module and subunit with 0.
* Keep the `moduleTitle` constant in files with the same `moduleTitle`. Even small differences might cause a problem (e.g., About and ABout would result in different modules)
* Keep the `unitTitle` constant in files with the same `unitTitle`




