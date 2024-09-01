import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import ListItem from "../listitems/Listitems"; // Ensure correct import path
import "./list.scss";
import { useRef, useState } from "react";
import React from "react";

export default function List({ list }) {
  const listRef = useRef();
  const [slideNumber, setslideNumber] = useState(0);
  const [isMoved, setIsMoved] = useState(false);

  const handleclick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNumber > 0) {
      setslideNumber(slideNumber - 1);
      listRef.current.style.transform = `translate(${230 + distance}px)`;
    }
    if (direction === "right" && slideNumber < 3) {
      setslideNumber(slideNumber + 1);
      listRef.current.style.transform = `translate(${-230 + distance}px)`;
    }
  };

  return (
    <div className="list">
      <span className="listTitle">{list.title}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleclick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {list.content.map((item, i) => (
            <ListItem key={i} index={i} item={item} />
          ))}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleclick("right")}
        />
      </div>
    </div>
  );
}
