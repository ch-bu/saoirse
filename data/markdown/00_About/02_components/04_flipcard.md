---
moduleTitle: About
unitTitle: Components
title: Flipcards
module: 0
unit: 2
subunit: 4
type: question
---

Saoirse incorporates a simple flipcard component. To add a flipcard, navigate to the /data/yaml/flipcard.yaml file and add the flipcard information:

```
- front: What does the acronym www stand for?
  back: World Wide Web.
  flipcardid: 1
```

Then, add the following code snippet to your markdown file:

```
<flipcard id="1"></flipcard>
```

<flipcard id="1"></flipcard>

asdf

<flipcard id="2"></flipcard>