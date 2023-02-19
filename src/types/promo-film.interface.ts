export interface FilmPromoInterface {
  promo(documentId: string): Promise<boolean>;
}
