function createErrorNode(msg) {
  var errorContainer = document.createElement("div");
  errorContainer.classList.add("input-error-msg");

  if (msg) {
    errorContainer.innerText = msg;
  }
  return errorContainer;
}

function createErrorDisplay(node, target) {
  target.parentNode.appendChild(node);

  setTimeout(function () {
    node.remove();
  }, 3000);
}

String.prototype.letterOnly = function () {
  return !Array.from(this).find(function (character) {
    return !isNaN(character) && character == "";
  });
};

String.prototype.haveUpperCase = function () {
  return !!Array.from(this).find(function (character) {
    return character === String(character).toUpperCase();
  });
};

String.prototype.haveNumeric = function () {
  return !!Array.from(this).find(function (character) {
    return !isNaN(character);
  });
};

window.onload = function () {
  document
    .getElementById("paymentForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // check must be filled
      Array.from(
        document.getElementsByClassName("must-filled-validation")
      ).forEach(function (el) {
        if (!el.value) {
          createErrorDisplay(createErrorNode("Must Filled"), el);
        }
      });

      // check email
      Array.from(document.getElementsByClassName("email-validation")).forEach(
        function (el) {
          var value = String(el.value);

          if (!value.includes("@")) {
            createErrorDisplay(createErrorNode('Must Contain "@"'), el);
          }

          if (!value.endsWith(".com")) {
            createErrorDisplay(
              createErrorNode('The end of domain must be ".com"'),
              el
            );
          }
        }
      );

      // check card exp
      Array.from(
        document.getElementsByClassName("card-exp-validation")
      ).forEach(function (el) {
        let value = String(el.value).split("/");
        let mm = new String(value[0]);
        let yy = new String(value[1]);
        let wrongFormat =
          !mm ||
          !yy | (mm.length < 2) ||
          yy.length < 2 ||
          isNaN(mm) ||
          isNaN(yy);

        if (wrongFormat) {
          createErrorDisplay(
            createErrorNode("Exp must follow mm/yy format"),
            el
          );
        }
      });

      // check max length
      Array.from(document.querySelectorAll("*[length-max]")).forEach(function (
        el
      ) {
        var maxLength = Number(el.getAttribute("length-max"));
        var value = String(el.value);

        if (value.length > maxLength) {
          createErrorDisplay(
            createErrorNode("Can't more than " + maxLength + " character"),
            el
          );
        }
      });

      // check min length
      Array.from(document.querySelectorAll("*[length-min]")).forEach(function (
        el
      ) {
        var minLength = Number(el.getAttribute("length-min"));
        var value = String(el.value);

        if (value.length < minLength) {
          createErrorDisplay(
            createErrorNode("Can't less than " + minLength + " character"),
            el
          );
        }
      });

      // check letter only
      Array.from(
        document.getElementsByClassName("letter-only-validation")
      ).forEach(function (el) {
        let value = new String(el.value);

        if (!value.letterOnly()) {
          createErrorDisplay(createErrorNode("Letter only"), el);
        }
      });

      // check value contain uppercase
      Array.from(
        document.getElementsByClassName("contain-uppercase-validation")
      ).forEach(function (el) {
        let value = new String(el.value);

        if (!value.haveUpperCase()) {
          createErrorDisplay(createErrorNode("Must contain Uppercase"), el);
        }

        if (!value.haveNumeric()) {
          createErrorDisplay(createErrorNode("Must contain Number"), el);
        }
      });

      // check radio must filled
      Array.from(
        document.getElementsByClassName("radio-must-filled-validation")
      ).forEach(function (container) {
        let optionsEl = Array.from(container.querySelectorAll("*[name]"));

        let theresNoChecked = !optionsEl.find(function (radio) {
          return radio.checked;
        });

        if (theresNoChecked) {
          createErrorDisplay(createErrorNode("Must select one"), container);
        }
      });
    });
};
