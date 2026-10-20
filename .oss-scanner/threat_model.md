# secure-password-utility threat model

## Project and scan boundary

`secure-password-utility` is an ISC-licensed Node.js/TypeScript library that
validates password strength, generates strong passwords, and generates
product/license keys. It is published on npm as `secure-password-utility` and
consumed by front-end and back-end applications.

This enrollment covers only `https://github.com/michaeloki/secure-password-utility`.
It does not include downstream applications or the npm registry itself. Findings
must identify a defect in this repository's source under `src/`.

Security contact: Michael Oki — `security.oss.dev@pm.me` (see `SECURITY.md`).

## Inputs and trust boundaries

- `weakPasswordChecker(userPassword, userPasswordLength, additionalWords?)`
  receives attacker-influenced passwords and caller-supplied word lists. It must
  not accept weak or common passwords, and must not throw or fail open on
  malformed input (it is intentionally fail-closed, returning `false`).
- `strongPasswordGenerator`, `createStrongPassword`, `completePasswordGeneration`,
  `productKeyGenerator`, and `batchProductKeyGenerator` receive untrusted lengths,
  prefixes, charsets, and counts. They must validate inputs strictly and must not
  exhaust memory/CPU for extreme values.
- Generated passwords and product keys are treated as secrets by consumers.
  Predictability, insufficient entropy, or length shortening is a security defect.
- The bundled common-word list (`src/wordlist.ts`) is data, not code; it is not
  an attack surface but its matching logic is.
- The library has no runtime dependencies and performs no network access.

Assume the host application and Node.js runtime are trusted. An attacker may
control strings passed to the library (for example, a user-chosen password or a
remote length parameter). A finding should explain the concrete security impact
(account compromise, predictable secret, denial of service) rather than a
theoretical issue.

## Priorities and source map

1. Validation correctness: `src/utils/util.ts` (`inputValidator`, `stringCaster`),
   `src/main.ts` (`weakPasswordChecker`, `assertValidProductKeyLength`).
   Look for bypasses, type confusion, length mismatches, and fail-open paths.
2. Randomness and generation: `src/utils/random.ts` (`secureRandomInt`,
   `secureShuffle`), `src/main.ts` (`strongPasswordGenerator`,
   `createStrongPassword`, `productKeyGenerator`, `batchProductKeyGenerator`,
   `completePasswordGeneration`). Check CSPRNG usage, uniformity, shuffling, and
   any predictability.
3. Resource exhaustion: unbounded lengths/counts in generation functions and
   regex evaluation in `COMPLEXITY_PATTERN` and `containsCommonWord`.
4. Common-word filtering: `src/wordlist.ts` (`containsCommonWord`) — case
   folding, Unicode, fragment matching, and caller-supplied words.

## Offline environment and limitations

The repository builds offline. In the container:

- Node.js 20, npm, and the project's dev dependencies are available.
- Build: `npm run build` (TypeScript to `dist/`).
- Tests: `npm test` (Mocha + ts-node, fully offline).

No network access is required after `npm ci`. The scanner should run in the
built image at `/src`.

## Severity and reporting

- Critical/high: weak-password acceptance bypass; predictable or shortened
  generated passwords/keys; secret leakage.
- Medium: meaningful denial of service from untrusted input; common-word filter
  bypass with concrete impact; randomness non-uniformity.
- Low: robustness/hardening issues, minor validation inconsistencies.

Please provide affected commit, source locations, attacker capabilities, exact
input/reproducer, expected vs. actual behavior, and a minimal suggested patch.
Deduplicate by root cause. Use synthetic inputs in reproducers.
