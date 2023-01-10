const assignCardToList = async (cardId, listId) => {
  const response = await fetch(`https://trello.com/1/cards/${cardId}?key=${trelloKey}&token=${trelloToken}&idList=${listId}`, {
    method: "PUT"
  });

  return await response.json();
}

const addMemberToCard = async (cardId, memberId) => {
  const response = await fetch(`https://trello.com/1/cards/${cardId}?key=${trelloKey}&token=${trelloToken}&idMembers=${memberId}`, {
    method: "POST"
  });

  return await response.json();
}

const addLabelsToCard = async (cardId, labelId) => {
  const response = await fetch(`https://trello.com/1/cards/${cardId}?key=${trelloKey}&token=${trelloToken}&idLabels=${labelId}`, {
    method: "POST"
  });

  return await response.json();
}

TrelloPowerUp.initialize({
  'card-buttons': function (t) {
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Complete',
      callback: async function () {
        const card = await t.card("id");
        const cardId = card?.id;
        const board = await t.board("id", "labels");
        const boardId = board?.id;
        const boardLabels = board?.labels;
        const doneLabelId = boardLabels.filter(label => label.name === "Done")?.at(0)?.id;

        const member = await t.member("id");
        console.log("🚀 ~ file: client.js:47 ~ member", member);
        const memberId = member?.id;

        const lists = await t.lists("id", "name");
        const listId = lists.filter(list => list.name === "Design")?.at(0)?.id;

        try {
          const response1 = await assignCardToList(cardId, listId);
          const response2 = await addLabelsToCard(cardId, doneLabelId);
          const response3 = await addMemberToCard(cardId, memberId);
          t.alert({
            message: response1?.id ? "Moved Card Successfully" : "Failed To Move Card",
            duration: 2
          });
          t.alert({
            message: response2?.id ? "Added Done Label Successfully" : "Failed To Add Done Label",
            duration: 2
          });
          t.alert({
            message: response3?.id ? "Added You Successfully To The Card" : "Failed To Add You To The Card",
            duration: 2
          });
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