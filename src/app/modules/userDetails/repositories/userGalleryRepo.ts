import mongoose from "mongoose";
import userGallery from '../../../models/userGallery'; // If using MongoDB to store file data

export class UserGalleryRepo {

    getAll = async (data: any): Promise<any> => {
        const banner = await userGallery.find(data).sort({ createdAt: -1 });
        return banner;
    };

    getAllWithPagination = async (data?: any, pagination?: any): Promise<any> => {

        const banner = await userGallery.find(data).skip(pagination.skip).limit(pagination.limit).sort({ createdAt: -1 });
        return banner;

    };


    getAllCount = async (data: any): Promise<any> => {

        const total = await userGallery.countDocuments(data);
        return total;

    };

    // /**SAVE ALL GOALS */
    create = async (data: any): Promise<any> => {

        const banner = await userGallery.create(data);
        return banner;

    };


    // 
    get = async (criteria: any): Promise<any> => {

        const banner = await userGallery.findOne(criteria);
        return banner;

    };

    update = async (id: any, criteria: any): Promise<any> => {

        const banner = await userGallery.findByIdAndUpdate(id, criteria);
        return banner;

    };


    getById = async (criteria: any): Promise<any> => {
        let banner = await userGallery.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(criteria) }
            },
            {
                $lookup: {
                    from: "banner_videos",
                    localField: "_id",
                    foreignField: "banner_id",
                    as: "banner_videos"
                }
            },
            {
                $unwind: { path: "$banner_videos", preserveNullAndEmptyArrays: true } // Unwind the array to get a single object
            },
            {
                $lookup: {
                    from: "banner_forms",
                    localField: "_id",
                    foreignField: "banner_id",
                    as: "banner_forms"
                }
            },
            {
                $unwind: { path: "$banner_forms", preserveNullAndEmptyArrays: true } // Unwind the array to get a single object
            }
        ]);
        banner = banner && banner.length > 0 ? banner[0] : {};
        return banner;

    };

    // /**Update GOAL ORDER*/
    updateOrder = async (id: number, data: any): Promise<any> => {
        const resultdata = await userGallery.findByIdAndUpdate(id, data);
        return resultdata;
    };
}

export const userGalleryRepo = new UserGalleryRepo();

