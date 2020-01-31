import React from "react";
import { Header, Segment, Modal } from "semantic-ui-react";
import { Screenshot } from "./Screenshot";
import "./styles.css";

export default class Screenshots extends React.Component {
  constructor() {
    super();
    this.state = {
      showAll: false,
      modalActive: false,
      current: undefined
    };
  }

  showAllScreenshots = () => {
    this.setState(prevState => ({
      showAll: !prevState.showAll
    }));
  };

  showScreenshotModal = imageId => {
    this.setState(prevState => ({
      modalActive: !prevState.modalActive,
      current: imageId
    }));
  };

  render() {
    return (
      <div className="screenshots margin-top-sm">
        <Header className="white">
          Screenshots{" "}
          <small>
            <button
              className="show-hide-screenshots"
              onClick={this.showAllScreenshots}
            >
              show {!this.state.showAll ? "all" : "less"}
            </button>
          </small>
        </Header>
        <Segment basic>
          {this.props.screenshots &&
            this.props.screenshots
              .slice(0, this.state.showAll ? this.props.screenshots.length : 3)
              .map((s, i) => {
                return (
                  <Screenshot
                    size="med"
                    onClick={() => this.showScreenshotModal(s.image_id)}
                    imageId={s.image_id}
                    key={i}
                  />
                );
              })}
        </Segment>
        <Modal
          size="small"
          basic
          open={this.state.modalActive}
          onClose={this.showScreenshotModal}
        >
          <Modal.Content>
            <Screenshot size="big" imageId={this.state.current} />
          </Modal.Content>
        </Modal>
      </div>
    );
  }
}
