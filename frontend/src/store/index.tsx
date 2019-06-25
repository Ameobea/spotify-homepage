import * as R from 'ramda';
import { buildStore, buildActionGroup, buildModule } from 'jantix';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';

import { UserStats, Track, Artist } from '../types';

export const history = createBrowserHistory();

const customReducers = {
  router: connectRouter(history),
};

const middleware = routerMiddleware(history);

const entityStore = {
  ADD_TRACKS: buildActionGroup({
    actionCreator: (tracksById: { [trackId: string]: Track }) => ({
      type: 'ADD_TRACKS',
      tracks: tracksById,
    }),
    subReducer: (
      state: { tracks: { [trackId: string]: Track }; artists: { [artistId: string]: Artist } },
      { tracks }
    ) => ({ ...state, tracks: { ...state.tracks, ...tracks } }),
  }),
  ADD_ARTISTS: buildActionGroup({
    actionCreator: (artistsById: { [artistId: string]: Artist }) => ({
      type: 'ADD_ARTISTS',
      artists: artistsById,
    }),
    subReducer: (
      state: { tracks: { [trackId: string]: Track }; artists: { [artistId: string]: Artist } },
      { artists }
    ) => ({ ...state, artists: { ...state.artists, ...artists } }),
  }),
};

const userStats = {
  ADD_USER_STATS: buildActionGroup({
    actionCreator: (username: string, stats: UserStats) => ({
      type: 'ADD_USER_STATS',
      username,
      stats,
    }),
    subReducer: (state: { [username: string]: UserStats }, { username, stats }) => ({
      ...state,
      [username]: stats,
    }),
  }),
  CLEAR_USER_STATS: buildActionGroup({
    actionCreator: (username: string) => ({ type: 'CLEAR_USER_STATS', username }),
    subReducer: (state: { [username: string]: UserStats }, { username }) =>
      R.omit([username], state),
  }),
  SET_ARTIST_STATS: buildActionGroup({
    actionCreator: (
      username: string,
      artistId: string,
      topTracks: { trackId: string; score: number }[],
      popularityHistory: {
        timestamp: Date;
        popularityPerTimePeriod: [number | null, number | null, number | null];
      }[]
    ) => ({ type: 'SET_ARTIST_STATS', username, artistId, topTracks, popularityHistory }),
    subReducer: (
      state: { [username: string]: UserStats },
      { username, artistId, topTracks, popularityHistory }
    ) => {
      const existingUserStats = state[username] || {};
      const existingArtistStats = existingUserStats.artistStats || {};

      return {
        ...state,
        [username]: {
          ...existingUserStats,
          artistStats: {
            ...existingArtistStats,
            [artistId]: {
              topTracks,
              popularityHistory,
            },
          },
        },
      };
    },
  }),
};

const jantixModules = {
  userStats: buildModule<{ [username: string]: UserStats | undefined }, typeof userStats>(
    {},
    userStats
  ),
  entityStore: buildModule<
    { tracks: { [trackId: string]: Track }; artists: { [artistId: string]: Artist } },
    typeof entityStore
  >({ tracks: {}, artists: {} }, entityStore),
};

export const { dispatch, getState, actionCreators, useSelector, store } = buildStore<
  typeof jantixModules,
  typeof customReducers
>(jantixModules, middleware, customReducers);
