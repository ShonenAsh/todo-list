import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NewsService } from '../shared/News.service';
import { News } from '../shared/News.model';

declare var M: any;

@Component({
  selector: 'app-News',
  templateUrl: './News.component.html',
  styleUrls: ['./News.component.css'],
  providers: [NewsService]
})
export class NewsComponent implements OnInit {

  constructor(private NewsService: NewsService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshNewsList();
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.NewsService.selectedNews = {
      _id: "",
      name: "",
      doj: "",
      dob: "",
      matches: null
    }
  }

  onSubmit(form: NgForm) {
    if (form.value._id == "") {
      this.NewsService.postNews(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshNewsList();
        M.toast({ html: 'Saved successfully', classes: 'rounded' });
      });
    }
    else {
      this.NewsService.putNews(form.value).subscribe((res) => {
        this.resetForm(form);
        this.refreshNewsList();
        M.toast({ html: 'Updated successfully', classes: 'rounded' });
      });
    }
  }

  refreshNewsList() {
    this.NewsService.getNewsList().subscribe((res) => {
      this.NewsService.Newss = res as News[];
    });
  }

  onEdit(ply: News) {
    this.NewsService.selectedNews = ply;
  }

  onDelete(_id: string, form: NgForm) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.NewsService.deleteNews(_id).subscribe((res) => {
        this.refreshNewsList();
        this.resetForm(form);
        M.toast({ html: 'Deleted successfully', classes: 'rounded' });
      });
    }
  }

}
