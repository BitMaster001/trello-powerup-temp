const assignCardToList = async (cardId, listId, token) => {
  const response = await fetch(`https://trello.com/1/cards/${cardId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: JSON.stringify({
      key: trelloKey,
      token: token,
      idList: listId
    })
  });

  return response;
}

TrelloPowerUp.initialize({
  'card-buttons': function (t, options) {
    return t.getRestApi()
      .isAuthorized()
      .then(function (isAuthorized) {
        if (isAuthorized) {
          return [{
            icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
            text: 'Complete',
            callback: async function () {
              const card = await t.card("id");
              const cardId = card.id;
              const lists = await t.lists("id", "name");
              const listId = lists.filter(list => list.name === "Design")?.at(0)?.id;

              try {
                const x = await t.getRestApi();
                console.log(x);
                const token = await t.getRestApi().getToken();
                const response = await assignCardToList(cardId, listId, token);
                t.alert({
                  message: response?.id ? "Success" : "Failure",
                  duration: 2
                })
              }
              catch (e) {
                console.error(e);
              }
            }
          }];
        }
        else {
          return [{
            text: 'GT\'s Power-Up',
            callback: function showIframe(t) {
              return t.popup({
                title: 'Authorize to continue',
                url: './authorize.html'
              });
            }
          }];
        }
      })
  }
}, {
  appKey: trelloKey,
  appName: appName
});