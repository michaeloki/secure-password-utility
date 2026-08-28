const MAX_UINT32 = 0xffffffff;

/**
 * Returns a cryptographically secure random integer in [0, maxExclusive).
 * Prefers the Web Crypto API (browsers, Node >= 19) and falls back to
 * node:crypto's randomInt on older Node.js runtimes.
 */
export function secureRandomInt(maxExclusive: number): number {
    if (!Number.isInteger(maxExclusive) || maxExclusive < 1) {
        throw new RangeError('maxExclusive must be a positive integer');
    }

    const webCrypto = (globalThis as { crypto?: { getRandomValues?: (buf: Uint32Array) => Uint32Array } }).crypto;
    if (typeof webCrypto?.getRandomValues === 'function') {
        // Rejection sampling keeps the distribution uniform.
        const limit = Math.floor((MAX_UINT32 + 1) / maxExclusive) * maxExclusive;
        const buffer = new Uint32Array(1);
        let value: number;
        do {
            webCrypto.getRandomValues(buffer);
            value = buffer[0];
        } while (value >= limit);
        return value % maxExclusive;
    }

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { randomInt } = require('crypto') as { randomInt: (min: number, max: number) => number };
    return randomInt(0, maxExclusive);
}

/** Fisher-Yates shuffle driven by secure randomness. */
export function secureShuffle<T>(items: T[]): T[] {
    for (let i = items.length - 1; i > 0; i--) {
        const j = secureRandomInt(i + 1);
        [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
}
