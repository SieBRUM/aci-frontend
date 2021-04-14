import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../api.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-app-archive-dialog',
  templateUrl: './app-archive-dialog.component.html',
  styleUrls: ['./app-archive-dialog.component.scss']
})
export class AppArchiveDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private translate: TranslateService,
    private snackbarService: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<AppArchiveDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  /*
    Makes backend call to archive the product
  */
  archiveProduct() {
    this.apiService.archiveProduct(this.data.id).subscribe({
      next: (resp) => {
        this.snackbarService.open(this.translate.instant("PRODUCT.ARCHIVE.ARCHIVE_SUCCESFULL"), undefined, {
          panelClass: 'success-snack',
          duration: 1500
        });
        this.closeDialog();
        setTimeout(function () {
          window.location.reload();
        }, 1500);
      },
      error: (err) => {
        this.showErrorNotification(err.error)
      }
    })
  }

  /*
    Show error notification

    @param translateableMessage: string
    String that has to be presented in the error notification (gets translated)
  */
  private showErrorNotification(translateableMessage: string): void {
    this.snackbarService.open(this.translate.instant(translateableMessage), undefined, {
      panelClass: 'error-snack',
      duration: 2500
    });
  }

  /*
  *Closes this dialog
*/
  public closeDialog() {
    this.dialogRef.close();
  }
}
