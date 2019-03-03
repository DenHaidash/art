export interface ArtObjectDetails {
  objectNumber: string;
  title: string;
  longTitle: string;
  principalOrFirstMaker: string;
  webImage?: {
    url: string;
  };
  description: string;
  tags: {
    userId: number;
    name: string;
    lang: string;
    objectNumber: string;
  }[];
}
