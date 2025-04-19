import { Component, OnInit } from '@angular/core';
import { Storage, ref, listAll, getDownloadURL } from '@angular/fire/storage';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  imageUrls: string[] = [];
  loading: boolean = false;

  constructor(private storage: Storage, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    const storageRef = ref(this.storage, 'uploads');

    try {
      const res = await listAll(storageRef);
      const urls = await Promise.all(res.items.map(item => getDownloadURL(item)));
      this.imageUrls = urls;
    } catch (error) {
      console.error('Fehler beim Laden der Bilder:', error);
    }

    this.loading = false;
  }
  onNoClick(){

  }

  openDialog(index: number){
    this.dialog.open(ImageDialogComponent, {
      data: {
        urls: this.imageUrls,
        index: index,
      }
    })
   }
}
