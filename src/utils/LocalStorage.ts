export class LocalStorage {
    static saveToLocalStorage(name: string): void {
      if (typeof window === 'undefined') return;
  
      const namesArr = this.getLocalStorage();
  
      if (!namesArr.includes(name)) {
        namesArr.push(name);
      }
  
      localStorage.setItem('Pokemon', JSON.stringify(namesArr));
    }
  
    static getLocalStorage(): string[] {
      if (typeof window === 'undefined') return [];
  
      const localStorageData = localStorage.getItem('Pokemon');
  
      return localStorageData ? JSON.parse(localStorageData) : [];
    }
  
    static removeFromLocalStorage(name: string): void {
      if (typeof window === 'undefined') return;
  
      const namesArr = this.getLocalStorage();
      const nameIndex = namesArr.indexOf(name);
  
      if (nameIndex !== -1) {
        namesArr.splice(nameIndex, 1);
        localStorage.setItem('Pokemon', JSON.stringify(namesArr));
      }
    }
  }