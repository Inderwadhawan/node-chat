import { Request, Response,NextFunction } from 'express';
import {  imageUpload, awsFileSignature, multiUpload } from '../../../services/file_upload';
import { IPagination } from '../../../interfaces';
import {userGalleryRepo} from '../repositories/userGalleryRepo'


export class UserGalleryController {

   // Get all banners
   getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { type, limit } = req.query;
        let files: any;
        let pagination: boolean;
        let total: number = 0;

        pagination = req.query && req.query.pagination ? JSON.parse((req.query.pagination).toLocaleString()) : true;
        
        const paginationParams: IPagination = {
            skip: 0,
            limit: 15
        };

        if (type) {
            files = await userGalleryRepo.getById(type);
        } else {
          
        }

        res.status(201).json({ message: 'sucess',files});
        return;
      } catch (error) {
        res.status(400).json({ message: 'Error fetching user', error });
        return;
    }
};
  
}

export const userGalleryController = new UserGalleryController();
