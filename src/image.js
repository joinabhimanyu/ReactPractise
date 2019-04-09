import React from "react";
import RaisedButton from "material-ui/RaisedButton";
import { GridList, GridTile } from "material-ui/GridList";
import IconButton from "material-ui/IconButton";
import Subheader from "material-ui/Subheader";
import StarBorder from "material-ui/svg-icons/toggle/star-border";

const styles = {
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },
  gridList: {
    width: 500,
    height: 450,
    overflowY: "auto"
  }
};

// export interface IImage {
//   id?: string;
//   title?: string;
//   description?: string;
//   datetime?: number;
//   type?: string;
//   account_url?: string;
//   account_id?: number;
//   name?: string;
//   link?: string;
// }

// export interface IImageState {
//   images?: IImage[];
// }

export default class ImageComponent extends React.Component {
  state = {
    images: []
  };
  componentDidMount() {
    this.getImages();
  }
  getImages = () => {
    const url = "https://api.imgur.com/3/account/abhimanyu001/images/0";
    const access_token = "61427ae26768e96031d45ef20eda5e93ac7c7de6";
    fetch(url, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json"
      })
    })
      .then(response => response.json())
      .then(response => {
        const { data } = response;
        const pData = data.map(d => ({
          id: d.id,
          title: d.title,
          description: d.description,
          datetime: d.datetime,
          type: d.type,
          account_url: d.account_url,
          account_id: d.account_id,
          name: d.name,
          link: d.link
        }));
        this.setState({
          images: pData.slice()
        });
      });
  };
  render() {
    const { images } = this.state;
    return (
      <div>
        <div>
          <GridList cellHeight={180}>
            <Subheader>Images</Subheader>
            {images.map(image => (
              <GridTile
                key={image.account_url}
                title={image.title}
                subtitle={
                  <span>
                    by <b>{image.name}</b>
                  </span>
                }
                actionIcon={
                  <IconButton>
                    <StarBorder color="white" />
                  </IconButton>
                }
              >
                <img src={image.link} />
              </GridTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}
