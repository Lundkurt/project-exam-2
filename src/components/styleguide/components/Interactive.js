import React from "react";
import { Button } from "react-bootstrap";

function Interactive() {
  return (
    <div>
      <Button type="button" className="primary-btn">
        Primary
      </Button>

      <Button type="button" className="btn btn-danger">
        Danger
      </Button>
      <Button type="button" className="follow-btn-show">
        Follow
      </Button>
    </div>
  );
}

export default Interactive;
