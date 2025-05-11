import { Component } from '@angular/core';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import imageCompression from 'browser-image-compression';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent {
  loading: boolean = false;
  maxFileSize: number = 10;

  constructor(private storage: Storage) {}

  async uploadFiles(event: any) {
    const files: FileList = event.target.files;
    this.loading = true;

    for (const file of Array.from(files)) {
      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > this.maxFileSize) {
        alert("Slika je prevelika");
        continue;
      }
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.2,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        });

        const filePath = `uploads/${Date.now()}_${compressedFile.name}`;
        const storageRef = ref(this.storage, filePath);

        await uploadBytes(storageRef, compressedFile);
        const url = await getDownloadURL(storageRef);
        console.log(`Download-URL für ${file.name}:`, url);
      } catch (err) {
        console.error('Fehler beim Komprimieren oder Hochladen:', err);
      }
    }

    this.loading = false;
  }
}
