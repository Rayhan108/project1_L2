
import confiq from '../confiq';
import { USER_ROLE } from '../modules/user/user.constant';
import { UserModel } from '../modules/user/user.model';


const superUser = {
  id: '0001',
  email: 'abedinforhan@gmail.com',
  password: confiq.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: 'in-progress',
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await UserModel.findOne({ role: USER_ROLE.superAdmin });

  if (!isSuperAdminExits) {
    await UserModel.create(superUser);
  }
};

export default seedSuperAdmin;
