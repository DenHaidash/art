export class PersistencyService {
  getData<T>(key: string): T | null {
    try {
      return JSON.parse(localStorage.getItem(key)) as T;
    } catch (err) {
      return null;
    }
  }

  saveData<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }
}
