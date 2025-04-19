import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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
}
