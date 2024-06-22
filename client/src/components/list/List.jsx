import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import Listitems from "../listitems/Listitems";
import "./list.scss";
import { useRef, useState } from "react";

export default function List() {
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
      <span className="listTitle">Continue to watch</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleclick("left")}
          style={{ display: !isMoved && "none" }}
        />
        <div className="container" ref={listRef}>
          <Listitems index={0} />
          <Listitems index={1} />
          <Listitems index={2} />
          <Listitems index={3} />
          <Listitems index={4} />
          <Listitems index={5} />
          <Listitems index={6} />
          <Listitems index={7} />
          <Listitems index={8} />
          <Listitems index={9} />
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleclick("right")}
        />
      </div>
    </div>
  );
}
