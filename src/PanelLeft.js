/* eslint-disable jsx-a11y/alt-text */
import { Button, Input } from "@ui5/webcomponents-react";
import React, { useEffect, useRef, useState } from "react";
import DrawControllerInstance from "./Controller/DrawController";

function PanelLeft() {
  const completionWord = "Hi I'm Summer";
  const [title, setTitle] = useState();
  const indexRef = useRef(0);
  const isTyping = useRef(true);

  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTitle((prevTitle) => {
        if (isTyping.current) {
          // typing
          const result = prevTitle ? prevTitle + completionWord[indexRef.current] : completionWord[0];
          indexRef.current++;
          // finish typing
          if (indexRef.current + 1 > completionWord.length) {
            // wait
            // sleep(3000);
            isTyping.current = false;
          }
          return result;
        }
        else {
          // delete
          const prevTitleArr = prevTitle.split('');

          // finish deleting
          if (prevTitleArr.length === 0) {
            // wait
            isTyping.current = true;
            indexRef.current = 0;
          }
          // remove
          prevTitleArr.pop();
          return prevTitleArr.join('');
        }

      })
    }, 300);

    return () => clearInterval(timeInterval);
  }, []);

  const handleCreateRect = () => {
    DrawControllerInstance.rectManager.createRect();
  };
  return (
    <div className="panel">
      {/* <h1 className="title">{title}</h1> */}
      <Input type="text" placeholder="Search Shapes" />
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAEaSURBVHjabNGxS5VxFIfxz71XaWuQUJCG/gCHhgTD9VpEETg4aMOlQRp0EoezObgcd220KQiXmpretTAHQRBdojlQEJyukPdt+b1ywfvAGc7wnHP4nlZd1yKijQW8xzNc4Su+ZOYfQ3T6/f4YNvEJYzjELXp4VVXVz263+7cR2niBxAFeZ2YPi3iHR/gYERPDwhpOsd6sz8x/mfkNG3iOlWFhFj8y89J9KvzGXER0GuEaD42mgwHqUtoljbcRsTBCeINpfM/MgZLKPpaxFxGbOCqDXmILN7hoJrTKH+axhxmcYRxP0MIDnOBDZv5q1XUNIuJxifJp+UNV7t7BFM6xeic0RMQ4Bpl5W/ol7GISx/eEUUTECrbx+f8A8xhiZht9zsgAAAAASUVORK5CYII="
        title="Search"
        className={"searchIcon"}
      />
      <Button onClick={handleCreateRect}>create rect</Button>
    </div>
  );
}

export default PanelLeft;
