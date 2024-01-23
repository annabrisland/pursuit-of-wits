import React from "react";
import { createAvatar } from '@dicebear/core';
import { botttsNeutral } from '@dicebear/collection';

const Avatar = ({ seed }) => {
  const svg = createAvatar(botttsNeutral, { seed, scale:90, radius:50 });

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default Avatar;
