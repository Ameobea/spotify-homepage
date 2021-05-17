import React from 'react';
import { Link } from 'react-router-dom';

import { useUsername } from 'src/store/selectors';
import { colors } from 'src/style';
import './CompareToLanding.scss';
import '../components/BigButton.scss';

const CompareToLanding: React.FC = () => {
  const { username, displayName } = useUsername();

  return (
    <div className="compare-to-landing">
      <h1>
        Compare your musical taste to{' '}
        <span style={{ color: colors.pink }}>{displayName ?? '...'}</span>
      </h1>

      <div className="content-embed">
        <p>
          Connect your Spotify account to Spotifytrack to visualize the overlap in artists and
          tracks and generate a shared taste playlist.
        </p>
        <p>
          100% free, no caveats - just cool data! Only your Spotify listening data is obtained; no
          access to your account is granted.
        </p>

        <Link to={`/connect?state=${encodeURIComponent(JSON.stringify({ compare_to: username }))}`}>
          <button className="big-button">Connect to Spotify</button>
        </Link>
      </div>
    </div>
  );
};

export default CompareToLanding;
