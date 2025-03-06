import bcrypt from 'bcryptjs'

export const EncryptPassword = async (password: string): Promise<string> => {
     const saltRounds = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    return encryptedPassword;
}