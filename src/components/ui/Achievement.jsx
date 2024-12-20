import { FaCircle } from "react-icons/fa";
import "../../styles/Achievement.css";
import { GiCheckMark } from "react-icons/gi";
const Achievement = () => {
  return (
    <>
      <div className="Achievement">
        <div className="square1"></div>
        <div className="inner-box">
          <div className="box1 done">
            <div className="icon">
              <GiCheckMark />
            </div>
            <div className="txt">Member1</div>
          </div>
          <div className="box1">
            <div className="icon">
              <FaCircle />
            </div>
            <div className="txt">Member2</div>
          </div>
          <div className="box1">
            <div className="icon">
              <FaCircle />
            </div>
            <div className="txt">Member3</div>
          </div>
          <div className="box1">
            <div className="icon">
              <FaCircle />
            </div>
            <div className="txt">Member4</div>
          </div>
        </div>
        <div className="square1"></div>
      </div>
    </>
  );
};

export default Achievement;
