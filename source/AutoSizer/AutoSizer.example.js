/** @flow */
import Immutable from "immutable";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import {
  ContentBox,
  ContentBoxHeader,
  ContentBoxParagraph
} from "../demo/ContentBox";
import AutoSizer from "./AutoSizer";
import List from "../List";
import styles from "./AutoSizer.example.css";

export default class AutoSizerExample extends PureComponent {
  static contextTypes = {
    list: PropTypes.instanceOf(Immutable.List).isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      hideDescription: false
    };

    this._rowRenderer = this._rowRenderer.bind(this);
  }

  render() {
    const { list } = this.context;
    const { hideDescription } = this.state;

    return (
      <ContentBox
        {...this.props}
        style={{
          height: 400
        }}
      >
        <ContentBoxHeader
          text="AutoSizer"
          sourceLink="https://github.com/bvaughn/react-virtualized/blob/master/source/AutoSizer/AutoSizer.example.js"
          docsLink="https://github.com/bvaughn/react-virtualized/blob/master/docs/AutoSizer.md"
        />

        <ContentBoxParagraph>
          <label className={styles.checkboxLabel}>
            <input
              aria-label="Hide description (to show resize)?"
              className={styles.checkbox}
              type="checkbox"
              checked={hideDescription}
              onChange={event =>
                this.setState({ hideDescription: event.target.checked })}
            />
            Hide description (to show resize)?
          </label>
        </ContentBoxParagraph>

        {!hideDescription &&
          <ContentBoxParagraph>
            This component decorates <code>List</code>, <code>Table</code>, or
            any other component and automatically manages its width and height.
            It uses Sebastian Decima's{" "}
            <a
              href="https://github.com/sdecima/javascript-detect-element-resize"
              target="_blank"
            >
              element resize event
            </a>{" "}
            to determine the appropriate size. In this example{" "}
            <code>AutoSizer</code> grows to fill the remaining width and height
            of this flex column.
          </ContentBoxParagraph>}

        <div className={styles.AutoSizerWrapper}>
          <AutoSizer>
            {({ width, height }) =>
              <List
                className={styles.List}
                height={height}
                rowCount={list.size}
                rowHeight={30}
                rowRenderer={this._rowRenderer}
                width={width}
              />}
          </AutoSizer>
        </div>
      </ContentBox>
    );
  }

  _rowRenderer({ index, key, style }) {
    const { list } = this.context;
    const row = list.get(index);

    return (
      <div key={key} className={styles.row} style={style}>
        {row.name}
      </div>
    );
  }
}
