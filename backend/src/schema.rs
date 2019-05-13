table! {
    artist_history (id) {
        id -> Bigint,
        user_id -> Bigint,
        spotify_id -> Varchar,
        timeframe -> Unsigned<Tinyint>,
        ranking -> Unsigned<Smallint>,
    }
}

table! {
    artist_stats_history (id) {
        id -> Bigint,
        artist_spotify_id -> Varchar,
        followers -> Unsigned<Bigint>,
        popularity -> Unsigned<Bigint>,
        uri -> Text,
    }
}

table! {
    track_history (id) {
        id -> Bigint,
        user_id -> Bigint,
        spotify_id -> Varchar,
        timeframe -> Unsigned<Tinyint>,
        ranking -> Unsigned<Smallint>,
    }
}

table! {
    track_stats_history (id) {
        id -> Bigint,
        followers -> Unsigned<Bigint>,
        popularity -> Unsigned<Bigint>,
        playcount -> Nullable<Unsigned<Bigint>>,
    }
}

table! {
    users (id) {
        id -> Bigint,
        creation_time -> Datetime,
        last_update_time -> Datetime,
        username -> Text,
        token -> Text,
        refresh_token -> Text,
    }
}

joinable!(artist_history -> users (user_id));
joinable!(track_history -> users (user_id));

allow_tables_to_appear_in_same_query!(
    artist_history,
    artist_stats_history,
    track_history,
    track_stats_history,
    users,
);
