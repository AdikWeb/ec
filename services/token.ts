export const setToken = (token: string|null|undefined): void => {
    localStorage.token = token;
}

export const setRefreshToken = (token: string|null|undefined): void => {
    localStorage.refreshToken = token
};

export const getToken = (): string=>localStorage.token;
export const  getRefreshToken = (): string => localStorage.refreshToken;