import { Component } from '@angular/core';

@Component({
    selector: 'not-found',
    template: `
        <img src="../assets/Deletion_icon.svg" />
        <div>
        <a routerLink="/">La página no exite</a>
        </div>
    `
})
export class PageNotFoundComponent{
    constructor(){    }
}
