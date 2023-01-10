const assignCardToList = async (cardId, listId) => {
  const response = await fetch(`https://trello.com/1/cards/${cardId}?key=${trelloKey}&token=${trelloToken}&idList=${listId}`, {
    method: "PUT"
  });

  return await response.json();
}

const addMemberToCard = async (cardId, memberId) => {
  const response = await fetch(`https://trello.com/1/cards/${cardId}/idMembers?key=${trelloKey}&token=${trelloToken}&value=${memberId}`, {
    method: "POST"
  });

  return await response.json();
}

const addLabelsToCard = async (cardId, labelId) => {
  const response = await fetch(`https://trello.com/1/cards/${cardId}/idLabels?key=${trelloKey}&token=${trelloToken}&value=${labelId}`, {
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
        const targetLabelName = "Done";
        const targetListName = "Design";

        const card = await t.card("id", "labels", "members");
        console.log("🚀 ~ file: client.js:32 ~ card", card);
        const cardId = card?.id;
        const board = await t.board("labels");
        const boardLabels = board?.labels;
        const doneLabelId = boardLabels.filter(label => label.name === targetLabelName)?.at(0)?.id;

        const member = await t.member("id");
        const memberId = member?.id;

        const list = await t.list("name");
        console.log("🚀 ~ file: client.js:45 ~ list", list);
        const lists = await t.lists("id", "name");
        const listId = lists.filter(list => list.name === "Design")?.at(0)?.id;

        try {
          await assignCardToList(cardId, listId);
          await addLabelsToCard(cardId, doneLabelId);
          await addMemberToCard(cardId, memberId);
          t.alert({
            message: "Status Updated :heavy_check_mark:",
            duration: 2
          });
        }
        catch (e) {
          console.error("Error: ", e);
          t.alert({
            message: "Could not connect, contact admin :X:",
            duration: 2
          });
        }
      }
    }];
  }
}, {
  appKey: trelloKey,
  appName: appName
});