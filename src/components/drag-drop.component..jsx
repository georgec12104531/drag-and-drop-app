import React, { useState, useRef, useEffect } from "react";
import closeIcon from "../icons/close.png";
import {
  addReward,
  addAndRemoveCard,
  removeCard,
} from "../redux/category-reducer/category.actions";
import { connect } from "react-redux";

function DrapDrop({ data, addReward, addAndRemoveCard, removeCard }) {
  const [list, setList] = useState(data);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("History")) || []
  );

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handletDragStart = (e, item) => {
    dragItemNode.current = e.target;
    dragItem.current = item;
    let newHistory = history.slice();

    newHistory.push(list);
    setHistory(newHistory);
    localStorage.setItem("History", JSON.stringify(newHistory));
  };
  const handleDragEnter = (e, targetItem) => {
    if (!dragItem.current) return;

    const {
      current: { groupIndex: dragGroupIndex, itemIndex: dragCard },
    } = dragItem;

    const { groupIndex: targetGroupIndex, itemIndex: targetCard } = targetItem;

    if (
      list[dragGroupIndex].items[dragCard].val !== "" &&
      dragCard === targetCard &&
      list[targetGroupIndex].items[targetCard].val !==
        list[dragGroupIndex].items[dragCard].val
    ) {
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList));
        // Check to see that item is part of the reward column
        // if it is, we are adding a new itemIndex into the the system
        if (dragGroupIndex === 0) {
          newList[targetGroupIndex].items[targetCard].val =
            newList[dragGroupIndex].items[dragCard].val;
          // addReward({ targetGroupIndex, targetCard, dragGroupIndex, dragCard });
        } else {
          newList[targetGroupIndex].items[targetCard].val =
            newList[dragGroupIndex].items[dragCard].val;

          newList[dragGroupIndex].items[dragCard].val = "";
        }

        dragItem.current = targetItem;
        localStorage.setItem("List", JSON.stringify(newList));
        return newList;
      });
    }
  };
  const handleDragEnd = (e) => {
    dragItem.current = null;
    dragItemNode.current = null;
    // Add to history
  };

  const getStyles = (item) => {
    if (item === "") {
      return "dnd-item empty";
    } else {
      return "dnd-item";
    }
  };

  const handleRemove = ({ groupIndex, itemIndex }) => {
    // Remove from history
    let newHistory = history.slice();
    newHistory.push(JSON.parse(JSON.stringify(list)));
    setHistory(newHistory);
    localStorage.setItem("History", JSON.stringify(newHistory));

    setList((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList[groupIndex].items[itemIndex].val = "";
      // Add to Local Storage
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
      // Add new list to Local Storage
      localStorage.setItem("List", JSON.stringify(prev));

      // Pop last list from Local Storage history stack
      let newHistory = JSON.parse(localStorage.getItem("History"));
      newHistory.pop();
      localStorage.setItem("History", JSON.stringify(newHistory));
    }
  };

  if (list) {
    return (
      <div className="main-container">
        <div className="drag-n-drop">
          {/* Loop through all groups then then each group */}
          {list.map((group, groupIndex) => (
            <div id={groupIndex} key={groupIndex} className="dnd-group">
              {group.items.map(({ id, val }, itemIndex) => (
                <div
                  id={`${groupIndex}_${itemIndex}`}
                  // This makes the first row, which are the categories, not dragable
                  draggable={itemIndex !== 0 && val !== ""}
                  key={id}
                  onDragStart={
                    val !== ""
                      ? (e) =>
                          handletDragStart(e, {
                            groupIndex,
                            itemIndex,
                          })
                      : null
                  }
                  onDragEnter={(e) =>
                    handleDragEnter(e, { groupIndex, itemIndex })
                  }
                  onDragEnd={handleDragEnd}
                  className={getStyles(val)}
                >
                  {/* Cards that are empty, and cards on the first column and on the first row can't be moved */}
                  {val !== "" && groupIndex !== 0 && itemIndex !== 0 ? (
                    <img
                      onClick={() => handleRemove({ groupIndex, itemIndex })}
                      src={closeIcon}
                      className="remove"
                      alt="close"
                    ></img>
                  ) : null}
                  <div>{val}</div>
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

const mapDispatchToProps = (dispatch) => ({
  addReward: (items) => dispatch(addReward(items)),
  addAndRemoveCard: (current, target, value) =>
    dispatch(addAndRemoveCard(current, target, value)),
  removeCard: (groupIndex, card) => dispatch(removeCard(groupIndex, card)),
});

export default connect(null, mapDispatchToProps)(DrapDrop);
// export default DrapDrop;
