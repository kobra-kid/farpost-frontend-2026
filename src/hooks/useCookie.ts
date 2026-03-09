import Cookies from "js-cookie";

export const useCookie = (key: string) => {
    const get = (): string | undefined => {
        return Cookies.get(key);
    }

    const set = (value: string) => {
        Cookies.set(key, value);
    }

    const remove = () => {
        Cookies.remove(key);
    }

    return {
        get,
        set,
        remove
    }
};