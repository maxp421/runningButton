const runningElem = document.querySelector("#runningBtn");
runningElem.tabIndex = "-1";

document.body.addEventListener("mousemove", (e) => {
  avoidPointer(e, runningElem);
});
runningElem.addEventListener("click", () => alert("Was it worth it?"));

function avoidPointer(e, elem) {
  const elemCoords = getCoords(runningElem);
  const triggerDistance = 50; //px

  const distanceFromCenter = {
    x: elemCoords.centerX - e.clientX,
    y: elemCoords.centerY - e.clientY,
  };
  const pointerRelativeToElem = {
    isLeft:
      distanceFromCenter.x <= elem.offsetWidth / 2 + triggerDistance &&
      distanceFromCenter.x >= 0,
    isRight:
      distanceFromCenter.x >= -(elem.offsetWidth / 2 + triggerDistance) &&
      distanceFromCenter.x <= 0,
    isTop:
      distanceFromCenter.y <= elem.offsetHeight / 2 + triggerDistance &&
      distanceFromCenter.y >= 0,
    isBottom:
      distanceFromCenter.y >= -(elem.offsetHeight / 2 + triggerDistance) &&
      distanceFromCenter.y <= 0,
  };

  moveElemRelativeToPointer(elem, elemCoords, pointerRelativeToElem);
}

function getCoords(elem) {
  //get coords relative to the document including scroll.
  const box = elem.getBoundingClientRect();

  return {
    left: box.left + window.pageXOffset,
    right: box.right + window.pageXOffset,
    top: box.top + window.pageYOffset,
    bottom: box.bottom + window.pageYOffset,
    centerX: box.left + (box.right - box.left) / 2 + window.pageXOffset,
    centerY: box.top + (box.bottom - box.top) / 2 + window.pageYOffset,
  };
}

function moveElemRelativeToPointer(elem, elemCoords, pointerRelativeToElem) {
  //INITIALIZE ELEM AS ABSOLUTE
  if (
    !(
      (pointerRelativeToElem.isLeft && pointerRelativeToElem.isTop) ||
      (pointerRelativeToElem.isLeft && pointerRelativeToElem.isBottom) ||
      (pointerRelativeToElem.isRight && pointerRelativeToElem.isTop) ||
      (pointerRelativeToElem.isRight && pointerRelativeToElem.isBottom)
    )
  ) {
    return;
  }
  if (elem.style.position !== "absolute") {
    elem.style.position = "absolute"; // we want this to become absolute when
    elem.style.left = elemCoords.left + "px";
    elem.style.top = elemCoords.top + "px";
    elem.style.margin = 0 + "px";
    elem.style.transition = "0.1s";
  }

  function getRandomDistance() {
    return 40 + Math.random() * 25;
  }
  const dist1 = getRandomDistance();
  const dist2 = getRandomDistance();

  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  const scrollWidth = document.documentElement.clientWidth;

  if (pointerRelativeToElem.isLeft && pointerRelativeToElem.isTop) {
    //right bounds
    if (elemCoords.right + dist1 >= scrollWidth) {
      elem.style.left = elemCoords.left - 2 * dist1 + "px";
    } else {
      elem.style.left = elemCoords.left + dist1 + "px";
    }
    if (elemCoords.bottom + dist2 >= scrollHeight) {
      elem.style.top = elemCoords.top - 2 * dist2 + "px";
    } else {
      elem.style.top = elemCoords.top + dist2 + "px";
    }
    return;
  }

  if (pointerRelativeToElem.isLeft && pointerRelativeToElem.isBottom) {
    //right bounds
    if (elemCoords.right + dist1 >= scrollWidth) {
      elem.style.left = elemCoords.left - 2 * dist1 + "px";
    } else {
      elem.style.left = elemCoords.left + dist1 + "px";
    }
    if (elemCoords.top - dist2 <= 0) {
      elem.style.top = elemCoords.top + 2 * dist2 + "px";
    } else {
      elem.style.top = elemCoords.top - dist2 + "px";
    }
    return;
  }

  if (pointerRelativeToElem.isRight && pointerRelativeToElem.isTop) {
    //left bounds
    if (elemCoords.left - dist1 <= 0) {
      elem.style.left = elemCoords.left + 2 * dist1 + "px";
    } else {
      elem.style.left = elemCoords.left - dist1 + "px";
    }
    //bottom bounds
    if (elemCoords.bottom + dist2 >= scrollHeight) {
      elem.style.top = elemCoords.top - 2 * dist2 + "px";
    } else {
      elem.style.top = elemCoords.top + dist2 + "px";
    }
    return;
  }

  if (pointerRelativeToElem.isRight && pointerRelativeToElem.isBottom) {
    //left bounds
    if (elemCoords.left - dist1 <= 0) {
      elem.style.left = elemCoords.left + 2 * dist1 + "px";
    } else {
      elem.style.left = elemCoords.left - dist1 + "px";
    }
    //top bounds
    if (elemCoords.top - dist2 <= 0) {
      elem.style.top = elemCoords.top + 2 * dist2 + "px";
    } else {
      elem.style.top = elemCoords.top - dist2 + "px";
    }
    return;
  }
}
