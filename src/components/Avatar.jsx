import React from "react";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-male-sprites";

const Avatar = ({ seed }) => {
  const svg = createAvatar(style, { seed, scale:90, backgroundColor: "b6e3f4" });

  return <div dangerouslySetInnerHTML={{ __html: svg }} />;
};

export default Avatar;
