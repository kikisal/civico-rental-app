
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

const pass = await hashPassword("cicici");
// const passwordMatch = await bcrypt.compare("M00vinin", pass);

console.log(pass);
