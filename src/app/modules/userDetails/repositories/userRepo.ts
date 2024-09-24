import User from '../../../models/User';
import { IUser } from '../../../interfaces/model';

class UserRepository {

    async createUser(user: Partial<IUser>): Promise<IUser> {
        return await User.create(user);
    }

    async findUserById(id: string): Promise<IUser | null> {
        return await User.findById(id).select('-password');
    }


    async createOrUpdateById(userId: string, data:any, option:any): Promise<IUser | null> {
      return  await User.findByIdAndUpdate(userId, data, option);
    }

    // Add more methods as needed
}
export const userRepository = new UserRepository();
