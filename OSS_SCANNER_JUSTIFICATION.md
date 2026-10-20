# Justification: Enroll `secure-password-utility` in Anthropic OSS Scanner

## Summary

`secure-password-utility` is an open-source (ISC) Node.js package that validates
password strength, generates strong passwords, and generates product/license keys.
Its entire purpose is security-sensitive: consumers rely on it to reject weak
passwords and to produce unpredictable credentials. Enrolling it in Anthropic's
free OSS Scanner is justified because a defect in this library directly weakens
the authentication and licensing posture of every application that depends on it,
and because its small, self-contained, well-tested codebase is an excellent
candidate for automated, high-signal vulnerability review.

- npm: https://www.npmjs.org/package/secure-password-utility
- Source: https://github.com/michaeloki/secure-password-utility
- License: ISC
- Latest version: 1.6.0
- Maintainer: Michael Oki (`security.oss.dev@pm.me`)
- Runtime dependencies: none

## Why this project is security-relevant

The package's public API is almost entirely a security boundary:

- `weakPasswordChecker(password, length, additionalWords?)` decides whether a
  user-chosen password is acceptable. A bypass here (for example, a length
  mismatch that is not detected, a missing character-class check, or a
  case-folding/normalization gap in the common-word filter) causes downstream
  applications to accept weak or compromised passwords.
- `strongPasswordGenerator` / `createStrongPassword` produce credentials that
  users and systems treat as secrets. Any flaw in the randomness source, shuffling,
  or length handling could make generated passwords predictable or shorter than
  requested.
- `productKeyGenerator` / `batchProductKeyGenerator` produce license/product keys.
  Predictability or insufficient entropy here undermines licensing and access
  control.
- `completePasswordGeneration` appends user-controlled amounts of randomness to a
  prefix and is exposed to caller-supplied lengths and charsets.

Although the package has no runtime dependencies (limiting supply-chain exposure),
its own logic is the security-critical component. Regressions in validation or
generation are not caught by dependency scanners and are exactly the kind of
defects a model-based audit with reproducers and candidate patches can surface
cheaply.

## Eligibility and impact

Anthropic's OSS Scanner targets projects with "critical impact on infrastructure
and user security." This package qualifies on the user-security axis:

1. **Direct user-security impact.** Password strength enforcement and credential
   generation are on the critical path of account security for consumer and
   business applications. A vulnerability does not merely crash a build; it can
   silently admit weak passwords or emit predictable secrets.
2. **Reusable, shared component.** It is published on npm and consumed as a
   library rather than an application, so a single defect propagates to many
   downstream projects.
3. **Security-sensitive inputs.** Every entry point accepts untrusted input
   (passwords, lengths, word lists, charsets, counts) and must validate it
   strictly. The code already contains defensive validation (`inputValidator`,
   `stringCaster`, `InvalidInputError`), which makes it a good target for finding
   the remaining edge cases and inconsistencies (for example, unbounded lengths in
   `strongPasswordGenerator`, `completePasswordGeneration`, and
   `batchProductKeyGenerator` that could enable resource exhaustion).
4. **Open source and auditable.** Source, tests, and build are public; the
   project builds offline with `npm run build` and tests run with `npm test`
   using only dev dependencies.

## What the scanner can realistically find here

Based on the current code, an audit is likely to produce high-signal findings in
areas such as:

- Input-validation gaps and inconsistencies between functions (some enforce
  maximum lengths, others do not).
- Potential denial-of-service via very large requested lengths or batch counts.
- Correctness of the cryptographically secure randomness path, including the
  Web Crypto / `node:crypto` fallback and rejection sampling.
- ReDoS or correctness issues in the complexity regular expression and in
  `containsCommonWord` (case folding, Unicode, fragment matching).
- Error-handling behavior: `weakPasswordChecker` is intentionally fail-closed
  (returns `false`), while generators throw; verifying that no path fails open or
  leaks partial state is valuable.
- Mutation and aliasing issues in `secureShuffle` operating on caller-provided
  arrays.

These are precisely the classes of defects where model-generated reproducers and
candidate patches reduce maintainer effort.

## Maintainer readiness and triage capacity

- The maintainer is reachable at `security.oss.dev@pm.me` and already publishes
  security-relevant releases; prior commits include "Security update" and
  "Vulnerability fix."
- The project has a unit test suite (`tests/test.ts`) covering validation,
  generation, randomness, and common-word filtering, which gives the scanner's
  reproducers a clear oracle.
- The maintainer can provide a `Dockerfile` and a `threat_model.md` describing
  severity expectations (for example: weak-password acceptance and predictable
  key generation are high/critical; ReDoS and unbounded-input DoS are medium
  unless remotely triggerable; informational findings are low).
- The maintainer is prepared to receive model-generated, unreviewed reports and
  to validate them using the attached reproducers, consistent with the scanner's
  fast-track model. Reports should go to the security contact above; no
  additional CCs are required initially.

## Build and scan feasibility

- Build command: `npm run build` (TypeScript to `dist/`).
- Test command: `npm test` (Mocha + ts-node, fully offline).
- Node engine: `>=16`.
- No network access required after dependency installation, matching the
  scanner's no-Internet audit phase.
- A container image can install Node, run `npm ci` (dev dependencies only), build,
  and run tests, then execute the scanner in the built image.

## Disclosure preferences

Reports may be sent as model-generated findings without human review. The
maintainer accepts that severity ratings may be inflated and that some findings
may be duplicates. Findings should include the reproducer, bisection where
possible, and candidate patch. There is no request for a 90-day coordinated
disclosure window for these automated findings; the maintainer will triage and
patch promptly and release a new npm version.

## Recommendation

Enroll `secure-password-utility` in Anthropic OSS Scanner. The project is a
small, security-critical, dependency-free library whose defects directly weaken
consumer authentication and licensing. Automated scanning with reproducers and
patches offers a high benefit-to-effort ratio for a single maintainer and
strengthens the security of all downstream users. The repository now contains the in-repo enrollment artifacts the scanner expects:
`.oss-scanner/Dockerfile`, `.oss-scanner/threat_model.md`, and `SECURITY.md`
(security contact). The maintainer will submit the enrollment pull request to
`anthropics/oss-scanner` with `project.yaml` referencing these in-repo paths.
