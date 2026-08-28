import { InvalidInputError } from '../errors';

/**
 * Validates a requested length. Accepts positive integers (number) or
 * numeric strings and returns the value as a number.
 * Throws InvalidInputError for anything else - no silent parseInt coercion.
 */
export function inputValidator(value: unknown): number {
    let length: number;
    if (typeof value === 'number') {
        length = value;
    } else if (typeof value === 'string' && value.trim() !== '') {
        length = Number(value);
    } else {
        throw new InvalidInputError();
    }

    if (!Number.isInteger(length) || length <= 0) {
        throw new InvalidInputError();
    }
    return length;
}

/** Casts string-like primitives to string; throws InvalidInputError otherwise. */
export function stringCaster(value: unknown): string {
    if (typeof value === 'string') {
        return value;
    }
    if (typeof value === 'number' || typeof value === 'bigint') {
        return String(value);
    }
    throw new InvalidInputError();
}
