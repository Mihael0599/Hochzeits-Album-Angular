import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { getStorage, ref, getDownloadURL } from "firebase/storage";

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent {
  urls: string[] = [];
  currentIndex: number = 0;
  currentImage: string = '';

  constructor(public dialog: MatDialogRef<ImageDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { urls: string[], index: number}) {

    this.urls = data.urls;
    this.currentIndex = data.index;
    this.currentImage = this.urls[this.currentIndex];
  }
  closeDialog() {

  }

  nextImage() {
    if (this.currentIndex === this.urls.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
    this.updateImage();
  }

  prevImage() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.urls.length - 1;
    } else {
      this.currentIndex--;
    }
    this.updateImage();
  }

  updateImage() {
    this.currentImage = this.urls[this.currentIndex];
  }

  async downloadImage() {
    const fileUrl = this.currentImage;
    const response = await fetch(fileUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const imageName = this.currentImage.substring(this.currentImage.lastIndexOf('/') + 1).split('?')[0];
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', imageName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}
