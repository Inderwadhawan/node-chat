import { Request, Response } from 'express';
import  Organization  from '../../../../models/organization';


export class MasterController {
  getAllOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const items = await Organization.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

createOrganization = async (req: Request, res: Response): Promise<void> => {
  try {
    const newItem = new Organization(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

  
}
export const masterController = new MasterController();