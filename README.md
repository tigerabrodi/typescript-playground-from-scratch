# TypeScript Playground

Let's build it from Scratch

## Notes

- Small version of TypeScript playground.
- Uses typescript to compile down to javascript.
- debounce function to not compile on every key stroke.

## Performance thoughts

- Offload typescript compilation process to a web worker.
- If using different tabs like real playground, consider lazy loading components
- Memoization where appropriate
