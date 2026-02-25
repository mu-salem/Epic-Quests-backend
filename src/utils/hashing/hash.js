import bcrypt from 'bcrypt';
export const hash = ({ plainText, rounds = Number(process.env.ROUNDS) }) => bcrypt.hashSync(plainText, rounds);
export const compareHash = ({ plainText, hash }) => bcrypt.compareSync(plainText, hash);
