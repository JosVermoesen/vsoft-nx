import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  seoKeywords: string;
  seoDescription: string;

  constructor(
    private ts: TranslateService,
    private metaS: Meta,
    private titleS: Title
  ) { }

  setAll(moduleName: string) {
    this.ts.get(moduleName + '.Seo-Title').subscribe((res: string) => {
      this.titleS.setTitle(res);
      this.ts.get(moduleName + '.Seo-Keywords').subscribe((res: string) => {
        this.seoKeywords = res;
        this.ts
          .get(moduleName + '.Seo-Description')
          .subscribe((res: string) => {
            this.seoDescription = res;
            const seoTags = [
              {
                name: 'keywords',
                content: this.seoKeywords,
              },
              {
                name: 'description',
                content: this.seoDescription,
              },
              // { name: 'robots', content: 'index, follow' }
            ];

            this.removeTags();
            this.metaS.addTags(seoTags);
          });
      });
    });
  }

  setTitle(moduleTitle: string) {
    this.titleS.setTitle(moduleTitle);
  }

  removeTags() {
    this.metaS.removeTag('name="description"');
    this.metaS.removeTag('name="keywords"');
    // this.metaS.removeTag('name="robots"');
  }
}
