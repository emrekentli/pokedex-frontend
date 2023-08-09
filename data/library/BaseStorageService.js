export class BaseStorageService {
    serializeOrDeserialize = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    };

    getItem(key) {
        try {
            let item = window.localStorage.getItem(key);
            item = this.serializeOrDeserialize.deserialize(item)[key];
            return item;
        } catch (e) {
            return null;
        }
    }
    setItem(key, item) {
        window.localStorage.setItem(key, this.serializeOrDeserialize.serialize({ [key]: item }));
    }
}
