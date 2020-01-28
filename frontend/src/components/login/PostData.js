export function PostData(type, state) {
    let BaseURL = '/api/user';

    return new Promise((resolve, reject) => {
        fetch(BaseURL, {
            method: 'POST',
            body: state
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });

    });
}