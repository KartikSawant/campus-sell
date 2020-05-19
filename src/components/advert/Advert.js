import React, { Component,Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteAdvert from './DeleteAdvert';
import AdvertDialog from './AdvertDialog';
import LikeButton from './LikeButton';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import LocationOn from '@material-ui/icons/LocationOn';
// Icons
import ChatIcon from '@material-ui/icons/Chat';
// Redux
import { connect } from 'react-redux';

const styles = {
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20,
  },
  image: {
    width: 200,
    maxWidth: 200,
    objectFit: 'cover'
  },
  content: {
    padding: 25,
    objectFit: 'cover',
  },
  loc:{
    verticalAlign: 'middle'
  }

};

class Advert extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      post: {
        title,
        createdAt,
        postImage,
        userHandle,
        postId,
        location,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteAdvert postId={postId} />
      ) : null;
    return (
      <Card className={classes.card}>
        <CardMedia
          image={postImage}
          title="Advert image"
          className={classes.image}
        />
        <CardContent className={classes.content}>
          <Typography variant="h5">{title}</Typography>
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Fragment>
              <LocationOn color="primary" className={classes.loc} /> <span className={classes.loc}>{location}</span>
              <hr className={classes.invisibleSeparator}  />
          </Fragment>
          <LikeButton postId={postId} />
          <span>{likeCount} Likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
          <AdvertDialog
            postId={postId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
        </CardContent>
      </Card>
    );
  }
}

Advert.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Advert));