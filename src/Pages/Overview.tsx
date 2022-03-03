// import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  dividerClasses,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useEffect, useState } from "react";
import { LeaguePlayer } from "../Models/LeaguePlayer";
import { Summoner } from "../Models/Summoner";

import { getPlayerByLeague, getPlayerByName } from "../Services/HttpService";

const Overview = (props: any) => {
  const [summoner, setSummoner] = useState<Summoner>();
  const [challengerPlayerList, setchallengerPlayerList] = useState<LeaguePlayer[]>();

  const fetchSummoner = async (summonerName: string) => {
    try {
      let fetchSummoner = await getPlayerByName(summonerName);

      setSummoner(fetchSummoner);
    } catch (error) {}
  };

  const fetchPlayersByLeague = async () => {
    try {
      let challengerPlayerList = await getPlayerByLeague("challenger", "rankedsolo");

      setchallengerPlayerList(challengerPlayerList);

      console.log(challengerPlayerList);
    } catch (error) {}
  };

  // Second Parameter tells the hook when to run e.g. the name changes
  useEffect(() => {
    fetchPlayersByLeague();
  }, []);

  const renderExhaustAndTabiAbuser = () => {
    return challengerPlayerList?.map((player: LeaguePlayer, index) => {
      return (
        <ListItem alignItems="flex-start" style={{ backgroundColor: "#1a261d", borderRadius: "20px", margin: "10px" }}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" />
          </ListItemAvatar>
          <ListItemText
            primary={`${player.summonerName} ${player.leaguePoints} LP`}
            secondary={
              <React.Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  {`W: ${player.wins} L: ${player.losses}`}
                </Typography>
                {" " + player.summonerId}
              </React.Fragment>
            }
          />
        </ListItem>
      );
    });
  };

  const renderCleanSummoners = () => {
    return challengerPlayerList?.map((player: LeaguePlayer, index) => {
      return (
        <ListItem alignItems="flex-start" style={{ backgroundColor: "darkblue", borderRadius: "20px", margin: "10px" }}>
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" />
          </ListItemAvatar>
          <ListItemText
            primary="Brunch this weekend?"
            secondary={
              <React.Fragment>
                <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                  Ali Connors
                </Typography>
                {" — I'll be in your neighborhood doing errands this…"}
              </React.Fragment>
            }
          />
        </ListItem>
      );
    });
  };

  return (
    <div>
      <Grid container spacing={2} columns={12} justifyContent="center">
        <Grid item xs={5}>
          {/* <List>{renderCleanSummoners()}</List> */}
          <List>{renderExhaustAndTabiAbuser()}</List>
        </Grid>
        <Grid item xs={5}>
          <List>{renderExhaustAndTabiAbuser()}</List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Overview;
