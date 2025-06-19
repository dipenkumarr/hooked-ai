import { hash, compare } from 'bcryptjs';

export async function hashPassword(password: string) {
    return hash(password, 12);

}

export async function comparePasswords(
    plainTextPassword: string,
    hashedPassword: string
) {
    return compare(plainTextPassword, hashedPassword);
}