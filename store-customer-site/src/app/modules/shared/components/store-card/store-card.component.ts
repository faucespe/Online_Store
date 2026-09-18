import { Component, input, computed } from '@angular/core';

type imageExtensions = 'jpg' | 'jpeg' | 'png' | 'webp';

@Component({
  selector: 'app-store-card',
  standalone: false,
  templateUrl: './store-card.component.html',
  styleUrl: './store-card.component.css',
})
export class StoreCard {
  public readonly imageUrl = input<string>('');
  public readonly imageDescription = input<string>('Item image');

  private readonly defaultImageUrl = '/img/no-image-available.jpg';
  private readonly validExtensions: imageExtensions[] = ['jpg', 'jpeg', 'png', 'webp'];

  //Validate image format
  protected imageSrc = computed(() => {
    const imageUrl: string = this.imageUrl();
    const isValidExtension = this.validExtensions.find((e) => imageUrl.endsWith(e));
    return isValidExtension ? imageUrl : this.defaultImageUrl;
  })
}
