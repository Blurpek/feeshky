var defaultDecks = [JSON.parse(deck)]

var decks = []
var userSet = []

function saveOptions() {
  browser.storage.sync.set({
    decks: JSON.stringify(decks),
    userSet: JSON.stringify(userSet)
  });
}

var handleDeckClick = function(e) {
  var deckLi = document.getElementById(e.target.id)
  var deck = decks.find(deck => deck.name === e.target.id)
  
  if (deck) {
    userSet = [...userSet, deck]
    decks = decks.filter(d => d.name !== deck.name)
    document.getElementById('chosen-decks').appendChild(deckLi)

  } else {
    deck = userSet.find(deck => deck.name === e.target.id)
    decks = [...decks, deck]
    userSet = userSet.filter(d => d.name !== deck.name)
    document.getElementById('all-decks').appendChild(deckLi)
  }

  saveOptions()
}

async function restoreOptions() {
  var allDeckslist = document.getElementById('all-decks')
  var userSetlist = document.getElementById('chosen-decks')
   
  await loadDecks(userSetlist, 'userSet', userSet)
  await loadDecks(allDeckslist, 'decks', decks)

  defaultDecks.filter(deck => !(decks.some(d => d.name === deck.name) || userSet.some(d => d.name === deck.name))).forEach(deck => {
    decks.push(deck)
    var deckElement = document.createElement('li')
    deckElement.id = deck.name
    deckElement.onclick = handleDeckClick
    deckElement.appendChild(document.createTextNode(deck.name))
    allDeckslist.appendChild(deckElement)
  })
}

function loadDecks(htmlList, nameOfSetInStorage, decks) {
  return browser.storage.sync.get(nameOfSetInStorage).then(result => {
    if (result[nameOfSetInStorage]) {
      JSON.parse(result[nameOfSetInStorage]).forEach(deck => {
        decks.push(deck)
        var deckElement = document.createElement('li')
        deckElement.id = deck.name
        deckElement.onclick = handleDeckClick
        deckElement.appendChild(document.createTextNode(deck.name))
        htmlList.appendChild(deckElement)
      })
    }
    return result
  })
}

document.getElementById('import').onclick = function() {
  var files = document.getElementById('selectFiles').files;
  
  if (files.length <= 0) {
    return false;
  }

  var fr = new FileReader();

  fr.onload = function(e) { 
    var result = JSON.parse(e.target.result);
    // var formatted = JSON.stringify(result, null, 2);
    if (!decks.some(d => d.name === result.name)) {
      decks.push(result)
      var deckElement = document.createElement('li')
      deckElement.id = result.name
      deckElement.onclick = handleDeckClick
      deckElement.appendChild(document.createTextNode(result.name))
      document.getElementById('all-decks').appendChild(deckElement)
      saveOptions()
    } else {
      alert('There is already that deck')
    }
  }

  fr.readAsText(files.item(0));
};

document.addEventListener("DOMContentLoaded", restoreOptions);
