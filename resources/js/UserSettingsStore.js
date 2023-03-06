import { writable } from 'svelte/store';

function createUserSettings() {
    const store = writable({});

    axios.get('/api/users/me/settings')
        .then(function (response) {
            store.set(response.data);
        })
        .catch(function (error) {
            alert(error);
            console.log(error);
        });

    return store;
};

export const UserSettings = createUserSettings();
