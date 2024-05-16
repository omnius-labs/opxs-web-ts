import React from 'react';
import './UploadContainer.css';

const UploadContainer: React.FC = () => {
  return (
    <div className="upload-container">
      <div className="file-list">
        <div className="file-info">
          <img src="path/to/example.png" alt="Icon" className="file-icon" />
          <div className="file-details">
            <div className="file-name">example.png</div>
            <div className="file-status">準備完了</div>
            <div className="file-size">225 KB</div>
          </div>
          <div className="file-options">
            <select>
              <option>...</option>
            </select>
          </div>
        </div>
        <div className="file-info">
          <img src="path/to/example.png" alt="Icon" className="file-icon" />
          <div className="file-details">
            <div className="file-name">example.png</div>
            <div className="file-status">準備完了</div>
            <div className="file-size">225 KB</div>
          </div>
          <div className="file-options">
            <select>
              <option>...</option>
            </select>
          </div>
        </div>
      </div>
      <div className="upload-actions">
        <button className="add-file">+ ファイルを追加</button>
        <button className="convert">変換</button>
      </div>
    </div>
  );
};

export default UploadContainer;
