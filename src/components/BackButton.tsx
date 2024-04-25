import React from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';

type Props = {}

const BackButton = (props: Props) => {
    const navigate = useNavigate()
  return (
    <div className=''>
      <IconButton onClick={() => navigate(-1)}  >
            <ArrowBackIcon/>
      </IconButton>
    </div>
  )
}

export default BackButton