import { Router } from 'express';
import { getPresignedUrl, completeUpload, deleteFile, listFiles } from './upload.controller';

const router = Router();

router.post('/presigned-url', getPresignedUrl);
router.post('/complete', completeUpload);
router.post('/delete', deleteFile);
router.get('/files', listFiles);

export default router;
