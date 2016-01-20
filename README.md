# redux-side-effect-example

This is a very simple example how [redux-saga](https://github.com/yelouafi/redux-saga) and [redux-side-effects](https://github.com/salsita/redux-side-effects) can be combined. So the whole point is that `redux-saga` is an excellent approach how to deal with long running transactions, its biggest drawback on the other hand is that the generator keeps its internal "intermediate" state which may be (or may not) be part of the domain. `redux-side-effects` on the other hand needs everything kept in the app state - even potentially non-serializable data (DOM nodes etc.).

We'll define a long running transaction (Saga) which will keep all the necessary DOM nodes & intermediate state. Once Saga is ready we can re-dispatch actions and provide the DOM nodes and all the impurities for the reducers which may perform all the business logic in one place including side effects while maintaining its purity.

The example demonstrates a block of input fields and you can simply Tab / Shift+Tab between them by defined "Focus Step". Once you blur the Component the focus will remain persisted in the app state so that once Focused again the corresponding input field gets focus. The point of the app is to take complete control over tabbing between DOM elements. I am sure that the result can be achieved by much simpler implementation but this serves demonstration purposes.

The example is very Elmish.

Conclusion: It's great to use `redux-saga` for long running transactions and as a persistance for non-serializable state which may potentially be used for performing side effects. `redux-side-effects` is a great tool when you need to keep your side-effects within the reducers while maintaining their purity. Combining them together is very powerful.

## Demo

```
  npm install
  npm start
  open http://localhost:3000
```