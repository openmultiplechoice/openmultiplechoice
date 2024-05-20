export function createSession(deckId) {
    var data = {
        deck_id: deckId,
    };
    axios
        .post("/api/sessions", data)
        .then(function (response) {
            window.location.href = "/sessions/" + response.data.id;
        })
        .catch(function (error) {
            alert(error);
        });
}
