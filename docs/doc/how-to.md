# Introduction
Showcase for [Coding Projects in Python](https://www.amazon.com/Coding-Projects-Python-DK/dp/1465461884). Invoke different cases at side bar.

## How to add a new page
- Add a instance to `docs/config/content.json` by following `MathTest` example.
  - **NOTE** space is not supported for now, will fix it later.
  ```json
  {
    "MathTest": {
      "name": "MathTest",
      "src": "view/py/math_test.yml"
    }
  }
  ```

- create underlying yaml file by following `view/py/math_test.yml`.
  ```yaml
  view:
    template:
      <h2>Math Test</h2>
      <div>10 quiz with 3 chances</div>
      <py-view src="//raw.githubusercontent.com/cd6oy/games/main/src/math_test"></py-view>
  
    import:
      - lib/py-view
  ```

- For local test:
  ```sh
  npm i -g serve
  server ./docs
  ```
  or use any http static serve util(nginx, jetty...) as you want.

## Tech Stack
- [Few UI Framework](https://few-ui.github.io/few-custom-element/) for this page.

- [Skulpt](https://skulpt.org/) for python engine.

- [vanilla-terminal](https://github.com/soyjavi/vanilla-terminal) for terminal in web.

- [Marked](https://github.com/markedjs/marked) for markdown display.

- [Milligam](https://milligram.io/) for CSS.