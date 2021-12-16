import { genSalt, hash, compare } from "bcryptjs";


export async function encrypt (password : string)
{
    const salt  = await genSalt(10)
    return hash(password, salt)
}

export async function compare_password(password : string, passwordbd : string) 
{
    return compare(password, passwordbd)
}