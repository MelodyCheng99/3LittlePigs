import React from 'react';

import { Box, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import brick from './../../img/icons/brick_icon.png';
import stick from './../../img/icons/stick_icon.png';
import mud from './../../img/icons/mud_icon.png';
import vp_3 from './../../img/board/vp_3.png';
import vp_5 from './../../img/board/vp_5.png';
import vp_7 from './../../img/board/vp_7.png';
import './boardComponent.css';

import Market from './marketComponent';
import ChooseResources from './chooseResourcesComponent';
import ChooseOpponent from './chooseOpponentComponent';

const Board = ({ 
    title, 
    resource, 
    firstPlayer, 
    resourceSlashCards, 
    height, 
    width,
    updateStats,
    updateOpponentsStatsOnBackend,
    secondaryOpponentsStats,
    tertiaryOpponentsStats,
    marketClick,
    chooseOpponentToBuyFrom,
    chooseOpponentToBuyFromClick,
}) => {
    return (
        <Box border={1} width="60%" 
            marginRight={firstPlayer ? "39px" : "0px"}
            marginLeft={firstPlayer ? "25px": "0px" }
        >
            <List>
                <ListItem style={{ marginTop: 8 }}>
                    <img 
                        src={resource === "Brick" ? brick : (resource === "Stick" ? stick : mud)} 
                        alt="" 
                        style={{ width: 100, height: 130 }}
                    />
                    { firstPlayer ? 
                        <ChooseResources 
                            height={height} 
                            width={width} 
                            resourceSlashCards={resourceSlashCards} 
                            updateStats={updateStats}
                            updateOpponentsStatsOnBackend={updateOpponentsStatsOnBackend}
                        /> : null 
                    }
                    { firstPlayer ? 
                        <Market 
                            resource={resource}
                            secondaryOpponentsStats={secondaryOpponentsStats}
                            tertiaryOpponentsStats={tertiaryOpponentsStats}
                            updateOpponentsStatsOnBackend={updateOpponentsStatsOnBackend}
                            marketClick={marketClick}
                            chooseOpponentToBuyFrom={chooseOpponentToBuyFrom}
                        /> : null 
                    }
                    { !firstPlayer && chooseOpponentToBuyFrom ?
                        <ChooseOpponent 
                            chooseOpponentToBuyFromClick={chooseOpponentToBuyFromClick}
                        /> : null
                    }
                    <ListItemText 
                        disableTypography
                        primary={<Typography className="HouseName">{title}</Typography>}
                    />
                </ListItem>

                <ListItem style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <img src={vp_3} alt="" style={{ width: 130, height: 100 }} />
                    <img src={vp_5} alt="" style={{ width: 130, height: 100 }} />
                    <img src={vp_7} alt="" style={{ width: 130, height: 100 }} />
                </ListItem>
            </List>
        </Box>
    );
}

export default Board;
