import { z } from "zod";


const userValidationSchema=z.object({
    
    password:z.string({invalid_type_error:'Password must be string'}).max(20,{message:'password can not gretter than 20 charecters'}).optional(),
    needsPasswordChange:z.boolean().optional(),
    


})
export default userValidationSchema;