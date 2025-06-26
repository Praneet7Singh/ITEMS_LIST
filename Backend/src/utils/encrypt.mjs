import bcrypt from "bcrypt";
const salt_rounds = 10;

export const hash_password = (password) => {
  const salt = bcrypt.genSaltSync(salt_rounds);
  return bcrypt.hashSync(password, salt);
};

export const Compare_password = (plain, hashed) => {
  return bcrypt.compareSync(plain, hashed);
};
