---
moduleTitle: About
unitTitle: Components
title: Single-Choice Questions
module: 0
unit: 2
subunit: 2
type: question
---

Saoirse uses [yaml files](https://en.wikipedia.org/wiki/YAML) to store all questions. For single-choice questions there is a yaml file called `singlechoice` in the /data/yaml directory. Have a look at the file:

```
- question: How old is Barack Obama?
  questionid: "1"
  answers:
    - answer: 57
      correct: True
      hint: That is correct
    - answer: 62
      correct: False
      hint: Nope. Younger than you expect
    - answer: 50
      correct: False
      hint: No way. He probably wishes to be that old.
```

Each single choice question starts with a question and a questionid. The questionid has to be unique. After you added the single-choice question to your yaml file, add the following snippet to your markdown file:

```
<singlechoice id="1"></singlechoice>
```

That's it. Correct answers are stored in your browser's localstorage so that you do not have to reanswer your question everytime.

<singlechoice id="1"></singlechoice>