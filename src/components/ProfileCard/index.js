import React from 'react'
import Cookies from 'js-cookie'

class ProfileCard extends React.Component {
  state = {profile: {}, status: 'loading'}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const response = await fetch('https://apis.ccbp.in/profile', {
      headers: {Authorization: `Bearer ${jwtToken}`},
    })
    if (response.ok) {
      const data = await response.json()
      this.setState({
        profile: data.profile_details,
        status: 'success',
      })
    } else {
      this.setState({status: 'failed'})
    }
  }

  render() {
    const {status, profile} = this.state
    if (status === 'loading') {
      return <div data-testid="loader">{/* Loader JSX */}</div>
    }
    return (
      <div className="filter-section">
        <img src={profile.profile_image_url} alt="profile" />
        <h1 className="profile-username">{profile.name}</h1>
        <p className="profile-bio">{profile.short_bio}</p>
      </div>
    )
  }
}

export default ProfileCard
