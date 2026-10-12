const text =
"Explore your world. Create your story.";

const element =
document.getElementById("typewriter-text");

let index = 0;

function typeWriter(){

    if(index < text.length){

        element.textContent += text.charAt(index);

        index++;

        setTimeout(typeWriter, 50);

    } else {

        document
        .getElementById("heroButtons")
        .classList
        .add("show");

    }

}

typeWriter();

function copyIP(){

    navigator.clipboard.writeText(
        "play.axlomc.net"
    );

    const button =
    document.querySelector(".primary-btn");

    button.textContent =
    "IP Copied!";

    setTimeout(() => {

        button.textContent =
        "Copy Server IP";

    }, 2000);

}
