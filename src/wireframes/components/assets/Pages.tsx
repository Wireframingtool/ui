/*
 * mydraft.cc
 *
 * @license
 * Copyright (c) Sebastian Stehle. All rights reserved.
 */

import { selectDiagram, useStore } from "@app/wireframes/model";
import { List } from "antd";
import * as React from "react";
import { useDispatch } from "react-redux";

import "./Pages.scss";

export const Pages = () => {
  const pages = useStore((s) => s.editor.present.diagrams);
  const dispatch = useDispatch();

  return (
    <>
      <div className="asset-shapes-search"></div>

      <List
        header={<h1 className="heading">Pages</h1>}
        bordered
        dataSource={pages.values}
        renderItem={(item, index) => (
          <List.Item onClick={() => dispatch(selectDiagram(item))}>
            Page {index + 1}
          </List.Item>
        )}
      />
    </>
  );
};
