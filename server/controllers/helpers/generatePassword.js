/* eslint-disable linebreak-style */
import { hash, genSalt } from 'bcryptjs';

async function generatePassword(data) {
  const salt = await (0, genSalt)(10);
  const newPassword = await hash(data.password, salt);
  return newPassword;
}
export default generatePassword;
