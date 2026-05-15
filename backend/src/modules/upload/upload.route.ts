import { Router } from 'express';
import { UploadController } from './upload.controller';

const router = Router();

router.post('/presigned-url', UploadController.getPresignedUrl);
router.post('/complete', UploadController.completeUpload);

export default router;
