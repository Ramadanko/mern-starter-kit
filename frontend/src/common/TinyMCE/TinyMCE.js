import React from 'react';
import { Editor } from '@tinymce/tinymce-react'
const KEY = process.env.REACT_APP_TINY_MCE_KEY;

const TinyMCE = ({ handleRteChange, value }) => {
  return (
    <div className="rte-wrapper" style={{ maxWidth: '800px' }}>
      <label htmlFor="tiny-mce">Description</label>
      <Editor id="tiny-mce" init={{ height: 300 }} value={value}
              apiKey={KEY} onEditorChange={handleRteChange} />
    </div>
  )
}

export default TinyMCE
