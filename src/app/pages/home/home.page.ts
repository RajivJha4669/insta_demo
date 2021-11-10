import { Component, OnInit, ViewChild } from '@angular/core';
import { PaginationParams, ResponseData, UserDetails } from 'src/app/shared/interface/common';
import { Apiurl } from 'src/app/shared/service/apiCollections';
import { HttpService } from 'src/app/shared/service/http.service';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  private feedParams: PaginationParams
  public listUsersFeed: Array<any> = [];
  public stories: Array<any> = [];
  constructor(
    private httpService: HttpService
  ) { }

  ngOnInit() {
    this.initiallize();
  }
  initiallize() {
    this.feedParams = {
      page: 1,
      results: 5,
      seed: "feed"
    }
    this.getAllFeeds();
  }
  private getAllFeeds(event?) {
    this.httpService.get(Apiurl.getAllFeeds, this.feedParams).subscribe((res: ResponseData) => {
      if (res.results && res.results.length) {
        res.results.map((result: UserDetails) => {
          result.fullName = result.name.first + ' ' + result.name.last;
        })
        this.listUsersFeed = this.listUsersFeed.concat(res.results);
        this.getAllStories();
        if (event) {
          event.target.complete();
        }
      } else {
        event.target.disabled = true;
      }
    })
  }
  private getAllStories() {
    this.stories = this.listUsersFeed;
  }

  public loadData(event) {
    this.feedParams = {
      page: 1 + this.feedParams.page,
      results: 5,
      seed: "feed"
    }
    this.getAllFeeds(event);
  }

  public doRefresh(event) {
    this.feedParams = {
      page: 1,
      results: 5,
      seed: "feed"
    }
    this.listUsersFeed = [];
    this.getAllFeeds(event);
  }
}
