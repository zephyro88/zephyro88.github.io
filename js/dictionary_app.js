// dictionary API search
async function dictionarySearch() {
    // clears previous results:
    document.getElementById("results").innerHTML = "";
  
    // calling dictionary API:  
    let input = document.getElementById('word-search');
    let response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + input.value);
  
    let results = await response.json();
  
    // display word that was searched
    document.getElementById('searched-word').innerHTML = input.value;
  
    // check if there's error (word can't be found):
    if (results['title']) {
      document.getElementById("results").innerHTML = "<p>" + results['title'] + "<br>" + results['message'] + "</p>";
    }
  
    // loop through result array
    for (const result of results) {
      // loop through meanings array
      for (const meaning of result.meanings) {
        const meaningItem = document.createElement("p");
  
        // show partOfSpeech:
        meaningItem.appendChild(document.createElement("span")).textContent = meaning.partOfSpeech;
        // add class name to partOfSpeech
        meaningItem.querySelector("span").classList.add("partOfSpeech");
        // create ul for definition(s):
        meaningItem.append(document.createElement("ul"));
  
        // loop through definitions array:
        for (const definition of meaning.definitions) {
  
          let example = "";
          // check if "example" exists (using simple array access):
          // array['key_name']
          if (definition['example']) {
            example = "<span class='example'>" + definition.example + "</span>";
          }
  
          // add li element (nested in ul) with definition + example:
          meaningItem.querySelector("ul").appendChild(document.createElement("li")).innerHTML = definition.definition + example;
        }
        document.getElementById("results").appendChild(meaningItem);
      }
      
    }
  }
  