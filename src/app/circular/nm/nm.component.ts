import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { DownloadNoticeMinorServiceService } from './download-notice-minor-service.service';
import { DataService } from 'src/app/minor-analysis/data.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-nm',
  templateUrl: './nm.component.html',
  styleUrls: ['./nm.component.css']
})
export class NmComponent {
  title = "DownloadNoticeMinor";

  submitted: boolean | undefined;
  constructor(private service: DownloadNoticeMinorServiceService,
    private dataService: DataService,
    private toast: ToastrService) { }

  ngOnInit(): void {
  }

  DownloadNoticeMinor() {
    console.log("Called ts");
    this.service.downloadNoticeMakeupCircular().subscribe((data: Blob | MediaSource) => {
      let downloadURL = window.URL.createObjectURL(data)
      saveAs(downloadURL);
    })
  }

  filename: string | undefined;
  inp2: any = {
    email: ' ',
    message: ' ',
    filename: ' '
  };


  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.inp2.filename = files[0];
    }
  }
  onSubmit1(): void {
    console.log("You've called the onclick function.");
    this.submitted = true;

    // Check if a file is selected and upload it
    if (this.inp2.filename) {
      this.dataService.uploadEmail11(this.inp2.filename).subscribe(
        (fileResp) => {
          console.log('File uploaded successfully:', fileResp);
          this.toast.success('File uploaded successfully');

          // If the file upload is successful, proceed to upload sheets
          this.dataService.uploadEmail(this.inp2).subscribe(
            (sheetsResp) => {
              console.log('Sheets uploaded successfully:', sheetsResp);
              this.toast.success('Sheets uploaded successfully');
            },
            (sheetsError) => {
              console.log('Error uploading sheets:', sheetsError);
              this.toast.error('Error uploading sheets');

              // Handle error uploading sheets
            }
          );
        },
        (fileError) => {
          console.log('Error uploading file:', fileError);
          this.toast.error('Error uploading file');


          // Handle error uploading file
        }
      );
    } else {

      this.toast.error('Please select a file first');
    }
  }

}