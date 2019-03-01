import { OrderByType } from './order-by-type';

export interface QueryParams {
  currentPage: number,
  pageSize: number,
  searchString: string,
  orderBy: OrderByType
}