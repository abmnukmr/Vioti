import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the LinkifyPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'linkify',
})
export class LinkifyPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(link: string): string {
    return this.linkify(link);
  }

  private linkify(plainText): string{
    let replacedText;
    let replacePattern1;
    let replacePattern2;
    let replacePattern3;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = plainText.replace(replacePattern1, '<a href="http://$1" style="color:green;text-decoration: none " >$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="https://$2" style="color:green;text-decoration: none" >$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1" style="color:green;text-decoration: none">$1</a>');

    return replacedText;
  }
}
