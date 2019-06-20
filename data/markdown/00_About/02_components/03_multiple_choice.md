---
moduleTitle: About
unitTitle: Components
title: Multiple-Choice Questions
module: 0
unit: 2
subunit: 3
type: question
---

Multiple-Choice Questions work similar to single-choice questions. First navigate to the in the /data/yaml/multiplechoice.yaml file. 

```
- question: Which of these animals is a mammal?
  questionid: 1
  hint: Not yet. Keep trying.
  answers:
    - answer: dog
      correct: True
    - answer: spider
      correct: False
    - answer: mouse
      correct: True
    - answer: bird
      correct: False
```

Each multiple-choice question starts with a question and a questionid. The questionid has to be unique. After you added the multiple-choice question to your yaml file, add the following snippet to your markdown file:

```
<multiplechoice id="1"></multiplechoice>
```

That's it. Correct answers are stored in your browser's localstorage so that you do not have to reanswer your question everytime.

<multiplechoice id="1"></multiplechoice>