## Unreleased

### Security
- Replaced `Math.random()` with cryptographically secure randomness (`crypto.randomInt` / Web Crypto) for all password and product key generation
- Removed the remote wordlist fetch (`mobilepushserver.com/passwds.json`); a bundled local wordlist is used instead, so checks are offline, deterministic and no longer fail open on network errors
- The password complexity check (upper/lower/digit/special) now always runs; previously it was skipped unless a dictionary word had already matched
- `createStrongPassword` now verifies its output with `weakPasswordChecker` and retries (bounded) instead of returning an unchecked password

### Fixed
- Dead `typeof String` conditionals in the input validators silently coerced bad input to `NaN` or prefix-parsed strings (e.g. `'12abc'` -> 12)
- `batchProductKeyGenerator` accepted any arguments because of a broken `.isNaN` check and returned empty strings for invalid lengths
- Product key alphabet now includes the digit `7`
- Special-character class in the complexity regex now covers every character in the generator's special set (`%`, `+`, `=` were previously rejected)

### Changed
- **Breaking:** invalid arguments to generator functions now throw `InvalidInputError` instead of returning `"Invalid input"` strings
- **Breaking:** `weakPasswordChecker` accepts an optional third argument for caller-supplied words and returns `false` for invalid input
- Package now ships compiled JavaScript (`dist/`) with TypeScript declarations instead of raw `.ts` sources
- TypeScript rewritten in strict mode; removed unused `rxjs` dependency

## 1.6.0

- Updated the README file
- Code optimisation
- Minor bug fix
- Added batch product key generation feature
- Added one more unit test
- Security update
