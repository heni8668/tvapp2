import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Container } from "@mui/material";
import './channel.scss'
import ChannelManager from './ChannelManager';

const Channel = () => {
  return (
    <div className='channel'>
        <Sidebar />
        <div className='channelContainer'>
            <Navbar />
            <div className='bottom'>
                <div className="right">
                    <Container>

                    <h1>Channel</h1>
                    <ChannelManager />
                    </Container>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Channel