const strictEquals = (seed, candidate) => seed === candidate;
const arrayMatcher = (matcher) =>
   (seed, candidates) => candidates.some(c => matcher(seed, c));

const done = (result) => {
   const match = () => ({
      then: () => done(result),
      evaluate: () => done(result),
   });
   return {
      match,
      matchOneOf: match,
      scratch: () => result,
      using: () => done(result),
   };
};

const notDone = (seed, matcher = strictEquals) => {
   const match = (candidate, newMatcher = matcher) => ({
      then: (newMatcher(seed, candidate))
         ? (result) => done(result)
         : () => notDone(seed, matcher),
      evaluate: (newMatcher(seed, candidate))
         ? (result) => done(typeof result === 'function' ? result() : result)
         : () => notDone(seed, matcher),
   });
   return {
      match,
      matchOneOf: candidates => match(candidates, arrayMatcher(matcher)),
      scratch: a => a,
      using: newMatcher => notDone(seed, newMatcher),
   };
};

export default (value) => notDone(value);
