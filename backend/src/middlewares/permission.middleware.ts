import { Request, Response, NextFunction } from 'express';
import { PermissionService } from '../modules/permission/permission.service';

const permissionService = new PermissionService();

export async function requireDatasetAccess(req: any, res: Response, next: NextFunction) {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Try to get datasetId from params or body
    const datasetId = parseInt(req.params.datasetId || req.params.id || req.body.datasetId);

    if (!datasetId || isNaN(datasetId)) {
      return res.status(400).json({ success: false, message: 'Dataset ID is required' });
    }

    const hasAccess = await permissionService.canAccessDataset(userId, datasetId);

    if (!hasAccess) {
      return res.status(403).json({ success: false, message: 'You do not have permission to access this dataset' });
    }

    next();
  } catch (err) {
    console.error('Permission check error:', err);
    return res.status(500).json({ success: false, message: 'Permission check failed' });
  }
}
