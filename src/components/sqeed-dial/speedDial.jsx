import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import BoardAddModal from '../boardAddForm/boardAddForm';


export default function BasicSpeedDial({ lectureService, fileUploader, addBoard }) {
  const actions = [
    {
      icon: <BoardAddModal
              lectureService={ lectureService }
              addBoard={ addBoard }
              fileUploader={ fileUploader }
              />,
      name: 'Create Lecture'
    },
  ];
  
  return (<>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 32, right: 32 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
      
      </>
  );
}
