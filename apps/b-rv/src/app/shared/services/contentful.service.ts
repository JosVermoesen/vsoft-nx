/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { from } from 'rxjs';

import { createClient } from 'contentful';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token,
  });

  getContentTypes() {
    const myContentObservable = from(
      this.client.getContentTypes().then((res) => res.items)
    );
    return myContentObservable;
  }

  getContentList(cType: string, query?: object) {
    const myListObservable = from(
      this.client
        .getEntries(
          Object.assign(
            {
              content_type: cType,
            },
            query
          )
        )
        .then((res) => res.items)
    );
    return myListObservable;
  }

  getContentDetail(contentId: string) {
    const myContentObservable = from(this.client.getEntry(contentId));
    return myContentObservable;
  }

  consoleLogContentTypes() {
    console.log('ContentTypeArray (Only for development purpose)');
    this.client
      .getContentTypes()
      .then((response) => console.log(response.items))
      .catch(console.error);
  }

  consoleLogContentList(cType: string, query?: object) {
    // console.log('ContentListArray (Only for development purpose)');
    this.client
      .getEntries(
        Object.assign(
          {
            content_type: cType,
          },
          query
        )
      )
      .then((response) => console.log(response.items))
      .catch(console.error);
  }

  consoleLogContentDetail(contentId: string) {
    this.client
      .getEntry(contentId)
      .then((entry) => console.log(entry))
      .catch((err) => console.log(err));
  }
}
