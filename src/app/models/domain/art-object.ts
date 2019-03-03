export interface ArtObject {
  objectNumber: string;
  title: string;
  longTitle: string;
  principalOrFirstMaker: string;
  webImage?: {
    url: string;
  };
  headerImage?: {
    url: string;
  };
}
