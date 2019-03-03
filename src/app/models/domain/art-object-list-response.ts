import { ArtObject } from './art-object';

export interface ArtObjectListResponse {
  artObjects: ArtObject[];
  count: number;
}
