const assignCardToList = async (cardId, listId) => {
  const response = await fetch(`https://api.trello.com/1/cards/${cardId}`, {
    method: "PUT",
    body: JSON.stringify({
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
            callback: async function (t) {
              if (isAuthorized) {
                const card = await t.card("id");
                const cardId = card.id;
                const lists = await t.lists("id", "name");
                const listId = lists.filter(list => list.name === "Design")?.at(0)?.id;

                try {
                  const response = await assignCardToList(cardId, listId);
                  console.log("🚀 ~ file: client.js:33 ~ response", response);
                  t.alert({
                    message: "Card is moved :heavy_check_mark:",
                    duration: 2
                  })
                }
                catch (e) {
                  console.error(e);
                }
              }
              else {
                t.alert({
                  message: "Could not connect, contact admin :X:",
                  duration: 2
                })
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