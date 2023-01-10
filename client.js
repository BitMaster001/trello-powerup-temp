const assignCardToList = async (cardId, listId) => {
  const response = await fetch(`https://trello.com/1/cards/${cardId}`, {
    method: "PUT",
    body: JSON.stringify({
      key: trelloKey,
      token: trelloToken,
      idList: listId
    })
  });

  return response;
}

TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Complete',
      callback: async function () {
        const card = await t.card("id");
        const cardId = card.id;
        const lists = await t.lists("id", "name");
        const listId = lists.filter(list => list.name === "Design")?.at(0)?.id;

        try {
          const response = await assignCardToList(cardId, listId);
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
}, {
  appKey: trelloKey,
  appName: appName
});