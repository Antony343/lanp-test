import React from 'react';
import styles from './App.module.scss';
import FileUploader from './components/FileUploader/FileUploader';

function App() {

  return (
    <div className={styles.container} >
      <FileUploader />
    </div>
  );
}

export default App;
