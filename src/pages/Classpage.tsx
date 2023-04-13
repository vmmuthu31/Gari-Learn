import React, { useState } from 'react';
import CreateClass from './Createclass';
import JoinClass from './JoinClass';

const ClassPage = () => {
  const [classInfo, setClassInfo] = useState(null);

  const handleClassCreated = (info) => {
    setClassInfo(info);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-2 gap-8">
        <div>{classInfo ? <JoinClass streamKey={classInfo.streamKey} /> : <CreateClass onClassCreated={handleClassCreated} />}</div>
      </div>
    </div>
  );
};

