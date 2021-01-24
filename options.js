var defaultDecks = []
var defaultDeck = JSON.parse(deck)

if (defaultDeck) {
  defaultDecks.push(defaultDeck)
}

var decks = []
var userSet = []

function saveOptions() {
  browser.storage.local.set({
    decks: JSON.stringify(decks),
    userSet: JSON.stringify(userSet)
  });
}

var handleDeckClick = function(e) {
  e.preventDefault()
  if (e.target.id != e.currentTarget.id)
    return

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

const handleRemoveDeck = function(e) {
  e.preventDefault()
  
  decks = decks.filter(d => d.name !== e.target.parentNode.id)
  userSet = userSet.filter(d => d.name !== e.target.parentNode.id)

  document.getElementById(e.target.parentNode.id).remove()

  saveOptions()
}

async function restoreOptions() {
  var allDeckslist = document.getElementById('all-decks')
  var userSetlist = document.getElementById('chosen-decks')
   
  await loadDecks(userSetlist, 'userSet', userSet)
  await loadDecks(allDeckslist, 'decks', decks)

  defaultDecks.filter(deck => !(decks.some(d => d.name === deck.name) || userSet.some(d => d.name === deck.name))).forEach(deck => {
    decks.push(deck)
    allDeckslist.appendChild(createDeckElement(deck.name))
  })
}

function loadDecks(htmlList, nameOfSetInStorage, decks) {
  return browser.storage.local.get(nameOfSetInStorage).then(result => {
    if (result[nameOfSetInStorage]) {
      JSON.parse(result[nameOfSetInStorage]).forEach(deck => {
        decks.push(deck)

        htmlList.appendChild(createDeckElement(deck.name))
      })
    }
    return result
  })
}

function createDeckElement(name) {
  const deckElement = document.createElement('li')
  deckElement.id = name
  deckElement.addEventListener('click', handleDeckClick)
  deckElement.appendChild(document.createTextNode(name))
  
  const removeIcon = document.createElement('span')
  removeIcon.innerText = '✘'
  removeIcon.addEventListener('click', handleRemoveDeck)
  deckElement.appendChild(removeIcon)

  return deckElement
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
      document.getElementById('all-decks').appendChild(createDeckElement(result.name))
      saveOptions()
    } else {
      alert('There is already that deck')
    }
  }

  fr.readAsText(files.item(0));
};

document.addEventListener("DOMContentLoaded", restoreOptions);
