import { prisma } from '../../lib/prisma';
import { minioClient, BUCKET_NAME } from '../../lib/minio';
import { v4 as uuidv4 } from 'uuid';

export class UserService {
  async uploadProfilePicture(userId: number, file: Express.Multer.File) {
    const fileName = `profile-pictures/${userId}-${uuidv4()}.${file.originalname.split('.').pop()}`;

    // Upload to MinIO
    await minioClient.putObject(
      BUCKET_NAME,
      fileName,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype }
    );

    // Update user profile
    const profilePictureUrl = `${process.env.MINIO_PUBLIC_URL || 'http://localhost:9000'}/${BUCKET_NAME}/${fileName}`;
    
    await prisma.user.update({
      where: { id: userId },
      data: { profilePicture: profilePictureUrl }
    });

    return { profilePicture: profilePictureUrl };
  }

  // ... existing methods ...
}
