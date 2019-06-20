---
moduleTitle: About
unitTitle: Components
title: Order Questions
module: 0
unit: 2
subunit: 5
type: question
---

To add a order question, navigate to the /data/yaml/order.yaml file. Add your question:

```
- question: Put the following terms in the correct order. The oldest person up.
  questionid: 1
  hint: Not yet, try again.
  answers:
    - answer: Barack Obama
    - answer: Prad Pitt
    - answer: Justin Biber
```

You do not have to explicitely define the order. The way you write the answers defines the right order.

Then add the following snippet to your markdown file:

```
<orderquestion id="1"></orderquestion>
```

<orderquestion id="1"></orderquestion>