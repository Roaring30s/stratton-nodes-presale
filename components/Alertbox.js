import * as React from 'react';
import LinearTimer from "./LinearTimer";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Alertbox(props) {

    return (
        <Alert severity={props.color} className={props.class}>
            <AlertTitle><strong>{props.title}</strong></AlertTitle>
            {props.message}
            <LinearTimer
                time={props.time}
                color={props.color}
            />
        </Alert>
    );

}