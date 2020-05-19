import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Advert from '../components/advert/Advert';
import Profile from '../components/profile/Profile'
import { connect } from 'react-redux';
import { getAdverts } from '../redux/actions/dataActions';
import AdvertSkeleton from '../util/AdvertSkeleton';
function Home(props) {
    
    useEffect(() => {
        props.getAdverts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { posts, loading } = props.data;
    let recentAdvertsMarkup = !loading ? (
        posts && posts.map((post) => <Advert key={post.postId} post={post} />)
      ) : (
        <AdvertSkeleton/>
      );
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                {recentAdvertsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile/>
                </Grid>
            </Grid>
        </div>
    )
}

Home.propTypes = {
    getAdverts: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
  };
  
  const mapStateToProps = (state) => ({
    data: state.data
  });
  
  export default connect(
    mapStateToProps,
    { getAdverts }
  )(Home);