import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'movie-posters',
          public_id: `poster-${Date.now()}-${Math.random().toString(36).substring(2)}`,
          transformation: [
            { width: 500, height: 750, crop: 'fill' }, // Standard poster dimensions
            { quality: 'auto' },
          ],
        },
        (error, result) => {
          if (error) {
            reject(new Error('Failed to upload image to Cloudinary'));
          } else {
            resolve(result?.secure_url || '');
          }
        },
      );

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      uploadStream.end(file.buffer);
    });
  }
}
