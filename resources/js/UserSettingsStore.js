import { writable } from 'svelte/store';

function createUserSettings() {
    const { subscribe, set, update } = writable({})

    axios.get('/api/users/me/settings')
        .then(function (response) {
            set(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    return {
        subscribe
    };
}

export const UserSettings = createUserSettings();
