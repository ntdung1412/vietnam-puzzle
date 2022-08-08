var height = 6; //number of guesses

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt
var ques;
var count = 0;
var listProvinces;
var check = false;

window.onload = function () {
    intialize();
}

function intialize() {
    fetch("data/provinces.json")
        .then(response => {
            return response.json();
        })
        .then(data => {
            data.forEach(element => {
                let opt = document.createElement("option")
                opt.value = element["id"]
                opt.innerText = element["name"]
                document.getElementById("answer").appendChild(opt)
            });
            ques = getRandomItem(data)  //answer of quizz
            document.getElementById("images").src = "images/provinces/" + ques["id"] + ".svg"
        });
}

function answer() {
    fetch("data/relations.json")
        .then(response => {
            return response.json();
        })
        .then(relations => {
            var ans = document.getElementById("answer").value   // player's choice
            var ann = document.getElementById("announcement")
            if (count < 6) {
                count += 1
                var hintName = document.createElement("div")
                var hintDirection = document.createElement("div")
                var hintDistance = document.createElement("div")
                hintName.classList.add("hint")
                hintName.classList.add("col")
                hintName.classList.add("rounded")
                hintDirection.classList.add("hint")
                hintDirection.classList.add("col-2")
                hintDirection.classList.add("rounded")
                hintDistance.classList.add("hint")
                hintDistance.classList.add("col-3")
                hintDistance.classList.add("rounded")
                var icon = document.createElement("i")
                icon.classList.add("fa-solid")
                var icon2 = document.createElement("i")
                icon2.classList.add("fa-solid")
                //find and show hint
                relations[ans].forEach(element => {
                    if (element["id"] == ques["id"]) {

                        var e = document.getElementById("answer");
                        var text = e.options[e.selectedIndex].text;
                        hintName.innerText = text
                        hintDistance.innerText = element["distance"] + " km"

                        var direction = element["direction"]
                        switch (direction) {
                            case "N":
                                icon.classList.add("fa-circle-arrow-up")
                                break;
                            case "S":
                                icon.classList.add("fa-circle-arrow-down")
                                break;
                            case "E":
                                icon.classList.add("fa-circle-arrow-right")
                                break;
                            case "W":
                                icon.classList.add("fa-circle-arrow-left")
                                break;
                            case "NW":
                                icon.classList.add("fa-circle-arrow-up")
                                icon2.classList.add("fa-circle-arrow-left")
                                break;
                            case "NE":
                                icon.classList.add("fa-circle-arrow-up")
                                icon2.classList.add("fa-circle-arrow-right")
                                break;
                            case "SE":
                                icon.classList.add("fa-circle-arrow-down")
                                icon2.classList.add("fa-circle-arrow-right")
                                break;
                            case "SW":
                                icon.classList.add("fa-circle-arrow-down")
                                icon2.classList.add("fa-circle-arrow-left")
                                break;
                        }
                        hintDirection.appendChild(icon)
                        hintDirection.appendChild(icon2)
                    }
                })
                var guess = document.getElementById("guess_" + count)
                guess.classList.remove("guesses")
                guess.appendChild(hintName)
                guess.appendChild(hintDirection)
                guess.appendChild(hintDistance)

                if (ans == ques["id"]) {
                    var btn = document.getElementById("btnGuess")
                    btn.parentNode.removeChild(btn)
                    ann.innerText = "Congratulation!!!"
                    ann.style.color = "green"
                    ann.style.fontSize = "32px"
                    ann.style.fontWeight = "bold"
                    icon.classList.remove("fa-circle-arrow-down")
                    icon.classList.add("fa-circle-check")
                    check = true
                }
            }
            if (count == 6 && check == false) {
                ann.innerText = "Answer is " + ques["name"] + "! \nYou Fault"
                var btn = document.getElementById("btnGuess")
                btn.parentNode.removeChild(btn)
                ann.style.color = "red"
                ann.style.fontSize = "32px"
                ann.style.fontWeight = "bold"
            }

        })

}

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}