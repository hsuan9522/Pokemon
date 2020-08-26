import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import { $getId } from '../utils';
import { getEvolution } from "../redux/action";

const Evolution = (props) => {
  const dispatch = useDispatch();
  const url = props.data.url;
  const id = $getId(url)
  const evolutionData = useSelector(state => {
    return state.evolution.find(el => el.id === id)
  });


  useEffect(() => {
    dispatch(getEvolution(url))
  }, [])

  return (
    <div className="step-wrapper">
      {evolutionData &&
        <Stepper activeStep={-1} alternativeLabel>
          {evolutionData.chain_name.map((el, index) => (
            <Step key={el+index}>
              <StepLabel>
                <img className="chain-pic" src={evolutionData.chain_pic[index]} />
                <div>{el}</div>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      }
    </div>
  )
}

export default Evolution;