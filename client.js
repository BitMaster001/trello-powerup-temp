const trelloKey = "e09972fad7a1cef5121e81cfea900c23";
const trelloToken = "ATTA7df39b453340ef94e5fb4296d51a29bd30dd6b49ee24a28f62bf0ae906a894a633B05B07";

const assignCardToList = (cardId, listId) => {

  var options = {
    method: "PUT",
    uri: `/1/cards/${cardId}/idList`,
    qs: {
      key: trelloKey,
      token: trelloToken,
      value: listId
    }
  };
  fetch(options, function (error, response, body) {
    if (error) {
      console.error(error);
    } else {
      console.info(response, body);
    }
  });
}

TrelloPowerUp.initialize({
  'card-buttons': function (t, options) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Complete',
      callback: async function (t) {
        try {
          const card = await t.card("id");
          const cardId = card.id;
          const lists = await t.lists("id", "name");
          const listId = lists.filter(list => list.name === "Design")?.at(0)?.id;
          assignCardToList(cardId, listId);
        }
        catch (e) {
          console.error(e);
        }
      }
    }];
  },
});