const trelloKey = "e09972fad7a1cef5121e81cfea900c23";
const trelloToken = "63bd1af6b5071a0248cf8894/ATTSeA9qeNry894CsIFuvVrH1eCYV4J9H5qvVYqJig6dXgc6uITunqEbQLPQ0NvUDo4lD9684363";

const assignCardToList = (cardId, listId) => {
  fetch(`https://api.trello.com/1/cards/${cardId}?key=${trelloKey}&token=${trelloToken}`, {
    method: "PUT",
    body: JSON.stringify({
      idList: listId
    })
  }, function (error, response, body) {
    if (error) {
      console.error(error);
    } else {
      console.info(response, body);
    }
  });
}

TrelloPowerUp.initialize({
  'card-buttons': async function (t, options) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Complete',
      callback: async function (t) {

        const card = await t.card("id");
        const cardId = card.id;
        const lists = await t.lists("id", "name");
        const listId = lists.filter(list => list.name === "Design")?.at(0)?.id;

        try {
          assignCardToList(cardId, listId);
        }
        catch (e) {
          console.error(e);
        }
      }
    }];
  },
});