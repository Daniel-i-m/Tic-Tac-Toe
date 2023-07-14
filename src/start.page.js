function starting() {
  const startDiv = document.getElementById("starter");
  const main = document.querySelector(".main");
  const radioInputs = startDiv.querySelectorAll("input[type='radio']");
  const start = startDiv.querySelector("button");

  main.style.display = "none";

  radioInputs[1].addEventListener("change", () => {
    if (radioInputs[1].checked) {
      const player2Html =`<div class="main-player">
        <label for="player2">Player Name</label>
        <input type="text" id="player2" placeholder="Enter name" required/>
      </div><button class="close">&times;</button>`;
      // setTimeout(() => {
      startDiv.querySelector(".opponent").innerHTML = player2Html;

      const close = document.querySelector(".close");
      close.style.cssText =
        "width: 20px; height: 20px; color: coral; font-weight: bold;";
      close.onclick = () => {
        window.location.reload();
      };
      // }, 200);
    }
  });

  start.addEventListener("click", () => {
    const player1Name = document.getElementById("player").value;
    let player2Name;

    if (radioInputs[1].checked) {
      player2Name = document.getElementById("player2").value;
    } else if (radioInputs[0].checked) {
      player2Name = "Computer";
    }

    if (!player1Name || !player2Name) {
      // alert("enter right names");
    } else {
      startDiv.style.display = "none";
      main.style.display = "flex";
    }
    // console.log(player1Name, player2Name, radioInputs[1].checked);
  });
}
starting();
