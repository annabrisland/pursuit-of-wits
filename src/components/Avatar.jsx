import React from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-male-sprites";

const Avatar = ({ seed }) => {
  const svg = createAvatar(style, { seed });

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default Avatar;
