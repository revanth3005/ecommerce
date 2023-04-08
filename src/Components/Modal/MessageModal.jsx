import React from "react";
import "./Modal.css";
const MessageModal = ({ getState, message, header }) => {
  const onClickCross = () => {
    getState(false);
  };
  return (
    <div className="blur">
      <div className="modalDemo">
        <div className="modalHeader">
          <h4>{header}</h4>
        </div>
        <hr />
        <div className="modalBody">
          <h5>{message}</h5>
        </div>
        <hr />
        <div className="modalFooter">
          <button onClick={onClickCross} className="btn btn-outline-danger">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
