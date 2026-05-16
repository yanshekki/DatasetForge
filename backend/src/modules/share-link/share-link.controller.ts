import { Request, Response } from 'express';
import { ShareLinkService } from './share-link.service';

const shareLinkService = new ShareLinkService();

export const createShareLink = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { permission, expiresInDays } = req.body;
    const shareLink = await shareLinkService.createShareLink(
      Number(id), 
      permission || 'READ', 
      expiresInDays
    );
    res.json({ success: true, data: shareLink });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to create share link' });
  }
};

export const getSharedDataset = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    const dataset = await shareLinkService.getDatasetByShareToken(token);
    if (!dataset) {
      return res.status(404).json({ success: false, message: 'Share link not found or expired' });
    }
    res.json({ success: true, data: dataset });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch shared dataset' });
  }
};

export const revokeShareLink = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;
    await shareLinkService.revokeShareLink(token);
    res.json({ success: true, message: 'Share link revoked' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Failed to revoke share link' });
  }
};
