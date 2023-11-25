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

  //rename to pointer, make move work even if only one condition is triggered?
  //add function pointer.inTriggerZone = true/false;
  const pointer = {
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
    hasTriggeredMove: function () {
      return (
        (this.isLeft && this.isTop) ||
        (this.isLeft && this.isBottom) ||
        (this.isRight && this.isTop) ||
        (this.isRight && this.isBottom)
      );
    },
  };
  moveElemRelativeToPointer(elem, elemCoords, pointer);
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

function moveElemRelativeToPointer(elem, elemCoords, pointer) {
  if (!pointer.hasTriggeredMove()) return;
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
  const randomDistance1 = getRandomDistance();
  const randomDistance2 = getRandomDistance();

  const scrollHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight,
  );
  const scrollWidth = document.documentElement.clientWidth;

  if (pointer.isLeft) {
    if (elemCoords.right + randomDistance1 >= scrollWidth) {
      elem.style.left = elemCoords.left - 2 * randomDistance1 + "px";
    } else {
      elem.style.left = elemCoords.left + randomDistance1 + "px";
    }
  }
  if (pointer.isRight) {
    if (elemCoords.left - randomDistance1 <= 0) {
      elem.style.left = elemCoords.left + 2 * randomDistance1 + "px";
    } else {
      elem.style.left = elemCoords.left - randomDistance1 + "px";
    }
  }
  if (pointer.isTop) {
    if (elemCoords.bottom + randomDistance2 >= scrollHeight) {
      elem.style.top = elemCoords.top - 2 * randomDistance2 + "px";
    } else {
      elem.style.top = elemCoords.top + randomDistance2 + "px";
    }
  }
  if (pointer.isBottom) {
    if (elemCoords.top - randomDistance2 <= 0) {
      elem.style.top = elemCoords.top + 2 * randomDistance2 + "px";
    } else {
      elem.style.top = elemCoords.top - randomDistance2 + "px";
    }
  }
}
