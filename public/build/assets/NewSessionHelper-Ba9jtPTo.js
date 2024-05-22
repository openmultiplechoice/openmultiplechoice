function n(a){var i={deck_id:a};axios.post("/api/sessions",i).then(function(s){window.location.href="/sessions/"+s.data.id}).catch(function(s){alert(s)})}export{n as c};
