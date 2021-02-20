import React, { Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import {Link} from 'react-router-dom';
import { getCurrentById} from '../../actions/profile';

const Profile = ({ getCurrentById, profile: { profile, loading}, auth, match}) => {
    useEffect(() => {
        getCurrentById(match.params.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[getCurrentById]);
    return (
        <Fragment>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn btn-dark'>Edit Profile</Link>)}
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile}/>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

Profile.propTypes = {
    getCurrentById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth,
})
export default connect(mapStateToProps, {getCurrentById})(Profile);
