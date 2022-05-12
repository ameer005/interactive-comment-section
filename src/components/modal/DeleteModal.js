import React from "react";
import ReactDom from "react-dom";
import "./DeleteModal.scss";

const DeleteModal = (props) => {
  return ReactDom.createPortal(
    <div onClick={() => props.setModalShow(false)} className="modal-overlay">
      <div onClick={(e) => e.stopPropagation()} className="modal-delete">
        <h3 className="modal-heading">Delete Comment</h3>
        <p className="modal-text">
          Are you sure you want to delete this comment? this will remove the
          comment and can't be undone.
        </p>
        <div className="modal-buttons">
          <button
            onClick={() => props.setModalShow(false)}
            className="btn-modal btn-modal--grey"
          >
            No, Cancel
          </button>
          <button onClick={props.onDelete} className="btn-modal btn-modal--red">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default DeleteModal;
