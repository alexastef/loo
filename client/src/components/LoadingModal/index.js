import React from 'react';

function LoadingModal () {
  return (
    <div role="alert" aria-live="assertive" aria-atomic="true" class="toast" data-autohide="false" data-animation="true"
      style="position: sticky; width: 200px; bottom: 0px; left: calc(50% - 100px); ">
      <div class="toast-body">
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span id="toastText">Loading Loos...</span>
      </div>
    </div>
  )l
}

export default LoadingModal;
