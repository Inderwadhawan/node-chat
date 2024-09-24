import User from '../../../../models/User';
import { IUser } from '../../../../interfaces';

class UserRepository {

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email }).exec();
  }

  async findAllNonAdminUsers(): Promise<IUser[]> {
    return User.find({ role: { $ne: 'ADMIN' } })
      .populate('userDetailsId')
      .select('-password')
      .exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id)
      .populate('userDetailsId')
      .select('-password')
      .exec();
  }

}

export const userRepository = new UserRepository();
