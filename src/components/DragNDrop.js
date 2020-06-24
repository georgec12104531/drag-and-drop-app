import React, { useState, useRef, useEffect } from "react";
import closeIcon from "../icons/close.png";
// import {
//   addCard,
//   addAndRemoveCard,
//   removeCard,
// } from "../redux/category-reducer/category.actions";
// import { connect } from "react-redux";

function DragNDrop({ data, addCard, addAndRemoveCard, removeCard }) {
  const [list, setList] = useState(data);
  // const [dragging, setDragging] = useState(false);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("History")) || []
  );

  useEffect(() => {
    console.log("use effect data", data);
    setList(data);
  }, [setList, data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    // e.target.styles.cursor = "pointer";
    console.log(e.target.className);
    console.log("Starting to drag");
    // Take screenshot of currentState in case the user decides not to let go of card on o
    e.dataTransfer.effectAllowed = "copyMove";
    dragItemNode.current = e.target;
    dragItemNode.current.addEventListener("dragend", handleDragEnd);
    dragItem.current = item;

    // setTimeout(() => {
    //   setDragging(true);
    // }, 0);
  };
  const handleDragEnter = (e, targetItem) => {
    // Check to see that item is part of the reward column
    // if it is, we are adding a new card into the the system
    e.dataTransfer.dropEffect = "copy";
    if (
      dragItem.current.card === targetItem.card &&
      list[targetItem.groupIndex].items[targetItem.card].val !==
        list[dragItem.current.groupIndex].items[dragItem.current.card].val
    ) {
      //   console.log("Moving to another category not the same as dragged item");
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));

        if (dragItem.current.groupIndex === 0) {
          // newList[targetItem.groupIndex].items[targetItem.card] =
          //   dragItemNode.current.textContent;\

          // console.log(
          //   " newList[dragItem.current.groupIndex].items[dragItem.current.card]",
          //   newList[dragItem.current.groupIndex].items[dragItem.current.card],
          //   "newList[targetItem.groupIndex].items[targetItem.card]",
          //   newList[targetItem.groupIndex].items[targetItem.card]
          // );

          newList[targetItem.groupIndex].items[targetItem.card].val =
            dragItemNode.current.textContent;

          // addCard(1, 2);
        } else {
          newList[targetItem.groupIndex].items[targetItem.card].val =
            newList[dragItem.current.groupIndex].items[
              dragItem.current.card
            ].val;

          newList[dragItem.current.groupIndex].items[
            dragItem.current.card
          ].val = "";

          // console.log("should be add and remove");
          // addAndRemoveCard({
          //   current: {
          //     groupIndex: dragItem.current.groupIndex,
          //     card: dragItem.current.card,
          //   },
          //   target: {
          //     groupIndex: targetItem.groupIndex,
          //     card: targetItem.card,
          //   },
          //   value: dragItemNode.current.textContent,
          // });
        }

        dragItem.current = targetItem;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };
  const handleDragEnd = (e) => {
    // setDragging(false);
    dragItem.current = null;
    dragItemNode.current.removeEventListener("dragend", handleDragEnd);
    dragItemNode.current = null;

    // Add to history

    let newHistory = history.slice();
    newHistory.push(JSON.parse(JSON.stringify(list)));
    setHistory(newHistory);

    localStorage.setItem("History", JSON.stringify(newHistory));
  };

  const getStyles = (item) => {
    if (item === "") {
      return "dnd-item empty";
    } else {
      return "dnd-item";
    }
  };

  const handleRemove = ({ groupIndex, card }) => {
    let newHistory = history.slice();
    newHistory.push(JSON.parse(JSON.stringify(list)));
    setHistory(newHistory);
    localStorage.setItem("History", JSON.stringify(newHistory));

    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList[groupIndex].items[card].val = "";

      localStorage.setItem("List", JSON.stringify(newList));

      return newList;
    });
  };

  const handleUndo = () => {
    if (history.length) {
      // Take from local storage
      let historyCopy = history.slice();
      let prev = historyCopy.pop();
      setHistory(historyCopy);
      setList(prev);
      localStorage.setItem("List", JSON.stringify(prev));

      // Remove from Local Storage
      let newHistory = JSON.parse(localStorage.getItem("History"));
      newHistory.pop();

      localStorage.setItem("History", JSON.stringify(newHistory));
    }
  };

  if (list) {
    return (
      <div className="main-container">
        {/* <div className="dnd-row">
          {["C1", "C2", "C3"].map((item, index) => (
            <div className="row-item" key={generateKey(item)}>
              {item}
            </div>
          ))}
        </div> */}
        <div className="drag-n-drop">
          {/* Loop through all groups then then each group */}
          {list.map((group, groupIndex) => (
            <div
              id={groupIndex}
              key={groupIndex}
              // onDragEnter={
              //   dragging && !group.items.length
              //     ? (e) => handleDragEnter(e, { groupIndex, card: 0 })
              //     : null
              // }
              className="dnd-group"
            >
              {group.items.map(({ id, val: item }, card) => (
                <div
                  id={`${groupIndex}_${card}`}
                  // This makes the first row, which are the categories not dragable
                  draggable={card !== 0 && item !== ""}
                  key={id}
                  onClick={() => {
                    console.log(item);
                  }}
                  onDragStart={
                    item !== ""
                      ? (e) =>
                          handletDragStart(e, {
                            groupIndex: groupIndex,
                            card: card,
                          })
                      : null
                  }
                  // onDrop={handleDragEnd}
                  onDragEnter={(e) => handleDragEnter(e, { groupIndex, card })}
                  className={getStyles(item)}
                >
                  {item !== "" && groupIndex !== 0 && card !== 0 ? (
                    <img
                      onClick={() => handleRemove({ groupIndex, card })}
                      src={closeIcon}
                      className="remove"
                      alt="close"
                    ></img>
                  ) : null}
                  <div>{item}</div>
                </div>
              ))}
            </div>
          ))}
          <button className="undo-button" onClick={handleUndo}>
            Undo
          </button>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

// const mapDispatchToProps = (dispatch) => ({
//   addCard: (item1, item2) => dispatch(addCard(item1, item2)),
//   addAndRemoveCard: (current, target, value) =>
//     dispatch(addAndRemoveCard(current, target, value)),
//   removeCard: (groupIndex, card) => dispatch(removeCard(groupIndex, card)),
// });

// export default connect(null, mapDispatchToProps)(DragNDrop);
export default DragNDrop;