enum LocalStorage {
  DefaultSettings = 'defaultSettings',
  Settings = 'Settings',
  InitSettings = 'initSettings',
}

const addLocalKey = (key: string) => `rsl13-${key}`;

const loadData = async <T>(url: string): Promise<T> =>
  fetch(url).then((response): Promise<T> => response.json()); //delete if no local .json items

const setData = <T>(key: LocalStorage, value: T) => {
  const stringData = JSON.stringify(value);
  window.localStorage.setItem(addLocalKey(key), stringData);
};

const removeData = (key: string) => {
  window.localStorage.removeItem(addLocalKey(key));
};

const getData = async (key?: LocalStorage) => {
  const localItems = window.localStorage.getItem(addLocalKey(key as string));
  if (localItems) {
    return JSON.parse(localItems); //need types for Data in LS
  }
};

export { setData, getData, removeData, loadData };
