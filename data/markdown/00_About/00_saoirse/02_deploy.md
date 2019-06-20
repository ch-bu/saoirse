---
moduleTitle: About
unitTitle: Saoirse
title: How to deploy?
module: 0
unit: 0
subunit: 2
type: information
---

Since Saoirse is nothing but a static webpage, you can deploy your e-learning course on any server.

First, you need to build the application:

```
gatsby build
```

Your e-learning course is then stored in the public directory. 

## Surge

The easiest option to host your e-learning course is to use [surge](https://surge.sh/). First, navigate into the public directory and then fire up surge:

```
npm install --global surge
surge
```

Surge will then navigate you through all the steps.

## GitHub pages

Another option to publish your e-learning course is directly on GitHub. [GitHub Pages](https://pages.github.com/) allows you to use their services to publish static webpages.

## Netlifly

GitHub pages is nice, but you need to rebuild your e-learning course everytime you change your markdown files. Netlifly let's you to bypass this step by doing it for you (continuous deployment). Have a look at the [Gatsby documentation](https://www.gatsbyjs.org/docs/hosting-on-netlify/). 


